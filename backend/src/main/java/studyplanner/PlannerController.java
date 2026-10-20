package studyplanner;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

/**
 * All the web addresses of the planner, in one file, divided into sections:
 * subjects, tasks, sessions, dashboard, settings, reset.
 *
 * Rules live directly inside the methods so there is no extra layer to read.
 * A method either returns data (Spring turns it into JSON) or throws -
 * ApiErrors (see the bottom of the folder) answers with a friendly message.
 */
@RestController
public class PlannerController {

    private final SubjectRepository subjects;
    private final TaskRepository tasks;
    private final StudySessionRepository sessions;
    private final ProgressCalculator calculator;
    private final SamplePlanBootstrap bootstrap;

    public PlannerController(SubjectRepository subjects, TaskRepository tasks, StudySessionRepository sessions,
                             ProgressCalculator calculator, SamplePlanBootstrap bootstrap) {
        this.subjects = subjects;
        this.tasks = tasks;
        this.sessions = sessions;
        this.calculator = calculator;
        this.bootstrap = bootstrap;
    }

    /* ======================= SUBJECTS ======================= */

    @GetMapping("/api/subjects")
    public List<Subject> allSubjects() {
        return subjects.findAll();
    }

    /** Adds a subject. Fails when the course code is already in use. */
    @PostMapping("/api/subjects")
    public Subject addSubject(@RequestBody Subject body) {
        if (subjects.findByCodeIgnoreCase(body.getCode()) != null) {
            throw new IllegalArgumentException("A subject with code " + body.getCode() + " already exists.");
        }
        return subjects.save(new Subject(body.getCode(), body.getName(), body.getTargetMinutes(), body.getColor()));
    }

    /** Removes the subject together with its tasks and sessions. */
    @DeleteMapping("/api/subjects/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // 204 = done, nothing to send back
    public void removeSubject(@PathVariable Long id) {
        Subject subject = subjects.findById(id).orElse(null);
        if (subject == null) {
            throw new NoSuchElementException("Subject " + id + " does not exist.");
        }
        tasks.deleteBySubjectId(subject.getId());
        sessions.deleteBySubjectId(subject.getId());
        subjects.delete(subject);
    }

    /* ======================= TASKS ======================= */

    /** Open tasks first (earliest due date first); completed tasks sink to the bottom. */
    @GetMapping("/api/tasks")
    public List<Task> allTasks() {
        List<Task> open = new ArrayList<Task>();
        List<Task> done = new ArrayList<Task>();
        for (Task task : tasks.findAll()) {
            if (task.isCompleted()) {
                done.add(task);
            } else {
                open.add(task);
            }
        }

        // Lecture 21 style: an anonymous class that knows how to compare two tasks.
        open.sort(new Comparator<Task>() {
            public int compare(Task a, Task b) {
                int byDate = a.getDueDate().compareTo(b.getDueDate());
                if (byDate != 0) {
                    return byDate;
                }
                return Long.compare(a.getId(), b.getId());
            }
        });
        done.sort(new Comparator<Task>() {
            public int compare(Task a, Task b) {
                int byDate = a.getDueDate().compareTo(b.getDueDate());
                if (byDate != 0) {
                    return byDate;
                }
                return Long.compare(a.getId(), b.getId());
            }
        });

        List<Task> ordered = new ArrayList<Task>();
        ordered.addAll(open);
        ordered.addAll(done);
        return ordered;
    }

    /** Adds a task, but only if the subject it points at really exists. */
    @PostMapping("/api/tasks")
    public Task addTask(@RequestBody Task body) {
        if (subjects.findById(body.getSubjectId()).isEmpty()) {
            throw new NoSuchElementException("Subject " + body.getSubjectId() + " does not exist.");
        }
        return tasks.save(new Task(
                body.getSubjectId(), body.getTitle(), body.getDueDate(),
                body.getEstimatedMinutes(), body.getPriority()));
    }

    /** Completes a task, or reopens it if it was already complete. */
    @PatchMapping("/api/tasks/{id}/toggle")
    public Task toggleTask(@PathVariable Long id) {
        Task task = tasks.findById(id).orElse(null);
        if (task == null) {
            throw new NoSuchElementException("Task " + id + " does not exist.");
        }
        task.toggleDone();
        return tasks.save(task);
    }

    /* ======================= SESSIONS ======================= */

    /** Sessions always come back sorted: soonest date and time first. */
    @GetMapping("/api/sessions")
    public List<StudySession> allSessions() {
        List<StudySession> all = sessions.findAll();

        // Lecture 21 style: an anonymous class that knows how to compare two sessions.
        all.sort(new Comparator<StudySession>() {
            public int compare(StudySession a, StudySession b) {
                int byDate = a.getDate().compareTo(b.getDate());
                if (byDate != 0) {
                    return byDate;
                }
                int byTime = a.getTime().compareTo(b.getTime());
                if (byTime != 0) {
                    return byTime;
                }
                return Long.compare(a.getId(), b.getId());
            }
        });
        return all;
    }

    /** Schedules a session, but only if the subject it points at really exists. */
    @PostMapping("/api/sessions")
    public StudySession addSession(@RequestBody StudySession body) {
        if (subjects.findById(body.getSubjectId()).isEmpty()) {
            throw new NoSuchElementException("Subject " + body.getSubjectId() + " does not exist.");
        }
        return sessions.save(new StudySession(
                body.getSubjectId(), body.getTopic(), body.getDate(),
                body.getTime(), body.getDurationMinutes()));
    }

    /** Marks a session done, or un-marks it. Done sessions count toward the weekly goal. */
    @PatchMapping("/api/sessions/{id}/toggle")
    public StudySession toggleSession(@PathVariable Long id) {
        StudySession session = sessions.findById(id).orElse(null);
        if (session == null) {
            throw new NoSuchElementException("Session " + id + " does not exist.");
        }
        session.toggleDone();
        return sessions.save(session);
    }

    /* ================== DASHBOARD AND SETTINGS ================== */

    /** The summary the page shows at the top: week, goal progress, counts, bars. */
    @GetMapping("/api/progress")
    public Map<String, Object> progress() {
        return calculator.compute();
    }

    @GetMapping("/api/settings")
    public Map<String, Object> settings() {
        Map<String, Object> settings = new HashMap<String, Object>();
        settings.put("weeklyGoalMinutes", ProgressCalculator.getWeeklyGoalMinutes());
        return settings;
    }

    /** Saves the weekly goal (in minutes). */
    @PutMapping("/api/settings")
    public Map<String, Object> saveSettings(@RequestBody Map<String, Object> body) {
        Object value = body.get("weeklyGoalMinutes");
        if (!(value instanceof Number)) {
            throw new IllegalArgumentException("Weekly goal is required as a number of minutes.");
        }
        ProgressCalculator.setWeeklyGoalMinutes(((Number) value).intValue());

        Map<String, Object> settings = new HashMap<String, Object>();
        settings.put("weeklyGoalMinutes", ProgressCalculator.getWeeklyGoalMinutes());
        return settings;
    }

    /* ======================= RESET ======================= */

    /** Restores the sample subjects, tasks, and sessions. */
    @PostMapping("/api/planner/reset")
    @ResponseStatus(HttpStatus.NO_CONTENT) // 204 = done, nothing to send back
    public void reset() {
        bootstrap.resetToSamplePlan();
    }
}
