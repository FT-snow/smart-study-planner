package studyplanner;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * The dashboard calculator - a plain helper class, exactly like the
 * ProgressCalculator class from Lecture 14. It adds up study minutes and
 * builds the summary the page shows at the top of the planner.
 *
 * Logic style: simple loops, a HashMap for the per-subject totals, and
 * one Map at the end that is sent to the page as JSON.
 */
@Service
public class ProgressCalculator {

    /** If the student has not chosen a goal yet, 10 hours per week. */
    public static final int DEFAULT_WEEKLY_GOAL_MINUTES = 600;

    /**
     * The weekly goal lives in one static field (Lecture 19: static belongs
     * to the class itself, not to an object). It keeps its value while the
     * app is running; subjects, tasks and sessions keep theirs forever,
     * because those are saved in the database.
     */
    private static int weeklyGoalMinutes = DEFAULT_WEEKLY_GOAL_MINUTES;

    private final TaskRepository tasks;
    private final StudySessionRepository sessions;
    private final SubjectRepository subjects;

    public ProgressCalculator(TaskRepository tasks, StudySessionRepository sessions, SubjectRepository subjects) {
        this.tasks = tasks;
        this.sessions = sessions;
        this.subjects = subjects;
    }

    public static int getWeeklyGoalMinutes() {
        return weeklyGoalMinutes;
    }

    /** A goal between 1 and 80 hours per week keeps the plan realistic. */
    public static void setWeeklyGoalMinutes(int minutes) {
        if (minutes < 60 || minutes > 4800) {
            throw new IllegalArgumentException("Weekly goal must be between 60 and 4800 minutes.");
        }
        weeklyGoalMinutes = minutes;
    }

    /** Monday of the week that contains today. getDayOfWeek gives 1 for Monday... 7 for Sunday. */
    public LocalDate currentWeekStart() {
        LocalDate today = LocalDate.now();
        return today.minusDays(today.getDayOfWeek().getValue() - 1);
    }

    public Map<String, Object> compute() {
        LocalDate today = LocalDate.now();
        LocalDate weekStart = currentWeekStart();
        LocalDate weekEnd = weekStart.plusDays(6);

        // Step 1: minutes completed inside the current week, plus a running
        // total per subject stored in a HashMap.
        int completedThisWeek = 0;
        Map<Long, Integer> completedMinutesPerSubject = new HashMap<Long, Integer>();

        for (StudySession session : sessions.findAll()) {
            if (!session.isCompleted()) {
                continue; // only finished sessions count
            }
            int minutes = session.getDurationMinutes();
            if (!session.getDate().isBefore(weekStart) && !session.getDate().isAfter(weekEnd)) {
                completedThisWeek = completedThisWeek + minutes;
            }
            Long subjectId = session.getSubjectId();
            Integer old = completedMinutesPerSubject.get(subjectId);
            completedMinutesPerSubject.put(subjectId, minutes + (old == null ? 0 : old));
        }

        // Step 2: headline counts.
        int openTasks = 0;
        int overdueTasks = 0;
        for (Task task : tasks.findAll()) {
            if (!task.isCompleted()) {
                openTasks = openTasks + 1;
            }
            if (task.isOverdue(today)) {
                overdueTasks = overdueTasks + 1;
            }
        }

        int upcomingSessions = 0;
        for (StudySession session : sessions.findAll()) {
            if (!session.isCompleted()) {
                upcomingSessions = upcomingSessions + 1;
            }
        }

        // Step 3: the weekly goal progress, capped at 100 percent.
        int percentOfGoal = 0;
        if (weeklyGoalMinutes > 0) {
            percentOfGoal = (int) Math.min(100, Math.round(100.0 * completedThisWeek / weeklyGoalMinutes));
        }

        // Step 4: one progress bar per subject.
        List<Map<String, Object>> bars = new ArrayList<Map<String, Object>>();
        for (Subject subject : subjects.findAll()) {
            Integer minutes = completedMinutesPerSubject.get(subject.getId());
            int done = minutes == null ? 0 : minutes;
            int percent = 0;
            if (subject.getTargetMinutes() > 0) {
                percent = (int) Math.min(100, Math.round(100.0 * done / subject.getTargetMinutes()));
            }
            Map<String, Object> bar = new LinkedHashMap<String, Object>();
            bar.put("subjectId", subject.getId());
            bar.put("code", subject.getCode());
            bar.put("name", subject.getName());
            bar.put("color", subject.getColor());
            bar.put("targetMinutes", subject.getTargetMinutes());
            bar.put("completedMinutes", done);
            bar.put("percentComplete", percent);
            bars.add(bar);
        }

        // Step 5: assemble the summary the page displays.
        Map<String, Object> summary = new LinkedHashMap<String, Object>();
        summary.put("weekStart", weekStart);
        summary.put("weekEnd", weekEnd);
        summary.put("weeklyGoalMinutes", weeklyGoalMinutes);
        summary.put("completedMinutesThisWeek", completedThisWeek);
        summary.put("percentOfGoal", percentOfGoal);
        summary.put("openTasks", openTasks);
        summary.put("overdueTasks", overdueTasks);
        summary.put("upcomingSessions", upcomingSessions);
        summary.put("subjects", bars);
        return summary;
    }
}
