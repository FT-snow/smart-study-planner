package studyplanner.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import studyplanner.domain.Priority;
import studyplanner.domain.StudySession;
import studyplanner.domain.Subject;
import studyplanner.domain.Task;
import studyplanner.dto.SessionRequest;
import studyplanner.dto.SessionView;
import studyplanner.dto.SubjectRequest;
import studyplanner.dto.SubjectView;
import studyplanner.dto.TaskRequest;
import studyplanner.dto.TaskView;
import studyplanner.exception.BadRequestException;
import studyplanner.exception.NotFoundException;
import studyplanner.repo.StudySessionRepository;
import studyplanner.repo.SubjectRepository;
import studyplanner.repo.TaskRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * All planner write logic lives here: adding subjects, tasks and sessions,
 * completing them, and removing a subject together with its items.
 *
 * <p>Each method returns web-page-ready view objects, built inside the
 * method so the related Subject can be read safely.</p>
 */
@Service
@Transactional
public class PlannerService {

    private final SubjectRepository subjects;
    private final TaskRepository tasks;
    private final StudySessionRepository sessions;

    public PlannerService(SubjectRepository subjects, TaskRepository tasks, StudySessionRepository sessions) {
        this.subjects = subjects;
        this.tasks = tasks;
        this.sessions = sessions;
    }

    /* ---------------- Subjects ---------------- */

    public List<SubjectView> listSubjects() {
        List<SubjectView> views = new ArrayList<SubjectView>();
        for (Subject subject : subjects.findAll()) {
            views.add(SubjectView.from(subject));
        }
        return views;
    }

    public SubjectView addSubject(SubjectRequest request) {
        // Rule: no two subjects may share a course code.
        if (subjects.findByCodeIgnoreCase(request.getCode().trim()).isPresent()) {
            throw new BadRequestException("A subject with code " + request.getCode().trim() + " already exists.");
        }
        Subject subject = new Subject(request.getCode(), request.getName(),
                request.getTargetMinutes(), request.getColor());
        return SubjectView.from(subjects.save(subject));
    }

    public void removeSubject(Long subjectId) {
        Subject subject = findSubject(subjectId);
        // A subject takes its tasks and sessions with it.
        tasks.deleteBySubject_Id(subject.getId());
        sessions.deleteBySubject_Id(subject.getId());
        subjects.delete(subject);
    }

    /* ---------------- Tasks ---------------- */

    public List<TaskView> listTasks() {
        List<Task> all = tasks.findAll();

        // Open tasks first, oldest due date first; completed tasks sink to the bottom.
        List<Task> open = new ArrayList<Task>();
        List<Task> done = new ArrayList<Task>();
        for (Task task : all) {
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

        LocalDate today = LocalDate.now();
        List<Task> ordered = new ArrayList<Task>();
        ordered.addAll(open);
        ordered.addAll(done);

        List<TaskView> views = new ArrayList<TaskView>();
        for (Task task : ordered) {
            views.add(TaskView.from(task, today));
        }
        return views;
    }

    public TaskView addTask(TaskRequest request) {
        Subject subject = findSubject(request.getSubjectId());
        Task task = new Task(subject, request.getTitle(), request.getDueDate(),
                request.getEstimatedMinutes(), parsePriority(request.getPriority()));
        return TaskView.from(tasks.save(task), LocalDate.now());
    }

    /** Completes a task, or reopens it if it was already complete. */
    public TaskView toggleTask(Long taskId) {
        Task task = findTask(taskId);
        task.toggleDone();
        return TaskView.from(task, LocalDate.now());
    }

    public void removeTask(Long taskId) {
        Task task = findTask(taskId);
        tasks.delete(task);
    }

    /* ---------------- Study sessions ---------------- */

    public List<SessionView> listSessions() {
        List<StudySession> all = sessions.findAll();

        // Soonest date and time first.
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

        List<SessionView> views = new ArrayList<SessionView>();
        for (StudySession session : all) {
            views.add(SessionView.from(session));
        }
        return views;
    }

    public SessionView addSession(SessionRequest request) {
        Subject subject = findSubject(request.getSubjectId());
        StudySession session = new StudySession(subject, request.getTopic(),
                request.getDate(), request.getTime(), request.getDurationMinutes());
        return SessionView.from(sessions.save(session));
    }

    /** Marks a session done, or un-marks it. Done sessions count toward the weekly goal. */
    public SessionView toggleSession(Long sessionId) {
        StudySession session = findSession(sessionId);
        session.toggleDone();
        return SessionView.from(session);
    }

    public void removeSession(Long sessionId) {
        StudySession session = findSession(sessionId);
        sessions.delete(session);
    }

    /* ---------------- Shared helper methods ---------------- */

    private Subject findSubject(Long subjectId) {
        Subject subject = subjects.findById(subjectId).orElse(null);
        if (subject == null) {
            throw new NotFoundException("Subject " + subjectId + " does not exist.");
        }
        return subject;
    }

    private Task findTask(Long taskId) {
        Task task = tasks.findById(taskId).orElse(null);
        if (task == null) {
            throw new NotFoundException("Task " + taskId + " does not exist.");
        }
        return task;
    }

    private StudySession findSession(Long sessionId) {
        StudySession session = sessions.findById(sessionId).orElse(null);
        if (session == null) {
            throw new NotFoundException("Session " + sessionId + " does not exist.");
        }
        return session;
    }

    /**
     * Only "Low", "Medium" or "High" (in any letter case) is accepted.
     * Anything else is a client mistake, so it becomes a 400 error.
     */
    private Priority parsePriority(String raw) {
        if (raw != null) {
            String value = raw.trim().toUpperCase();
            for (Priority priority : Priority.values()) {
                if (priority.name().equals(value)) {
                    return priority;
                }
            }
        }
        throw new BadRequestException("Priority must be Low, Medium, or High.");
    }
}
