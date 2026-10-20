package studyplanner.logic;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import studyplanner.domain.PlannerSettings;
import studyplanner.domain.StudySession;
import studyplanner.domain.Subject;
import studyplanner.domain.Task;
import studyplanner.repo.PlannerSettingsRepository;
import studyplanner.repo.StudySessionRepository;
import studyplanner.repo.SubjectRepository;
import studyplanner.repo.TaskRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * The dashboard calculator - a plain helper class, exactly like the
 * ProgressCalculator class from Lecture 14.
 *
 * It adds up study minutes and builds the summary numbers the web page
 * shows at the top of the planner. The page receives this summary as JSON
 * and displays it without doing any math of its own.
 */
@Service
public class ProgressCalculator {

    /** If no goal exists yet, 10 hours per week is a sensible start. */
    public static final int DEFAULT_WEEKLY_GOAL_MINUTES = 600;

    private final TaskRepository tasks;
    private final StudySessionRepository sessions;
    private final SubjectRepository subjects;
    private final PlannerSettingsRepository settings;

    public ProgressCalculator(TaskRepository tasks, StudySessionRepository sessions,
                              SubjectRepository subjects, PlannerSettingsRepository settings) {
        this.tasks = tasks;
        this.sessions = sessions;
        this.subjects = subjects;
        this.settings = settings;
    }

    /** Monday of the week that contains today. getDayOfWeek gives 1 for Monday... 7 for Sunday. */
    public LocalDate currentWeekStart() {
        LocalDate today = LocalDate.now();
        return today.minusDays(today.getDayOfWeek().getValue() - 1);
    }

    /** Builds the whole dashboard summary. Returns a Map because Jackson turns
     *  a Map into JSON exactly as it is written here. */
    public Map<String, Object> compute() {
        LocalDate today = LocalDate.now();
        LocalDate weekStart = currentWeekStart();
        LocalDate weekEnd = weekStart.plusDays(6);

        List<StudySession> allSessions = sessions.findAll();
        List<Task> allTasks = tasks.findAll();

        // Step 1: minutes completed inside the current week, and minutes per subject.
        int completedThisWeek = 0;
        Map<Long, Integer> completedMinutesPerSubject = new HashMap<Long, Integer>();

        for (StudySession session : allSessions) {
            if (!session.isCompleted()) {
                continue; // only finished sessions count
            }
            int minutes = session.getDurationMinutes();
            if (!session.getDate().isBefore(weekStart) && !session.getDate().isAfter(weekEnd)) {
                completedThisWeek = completedThisWeek + minutes;
            }
            Long subjectId = session.getSubjectId();
            Integer old = completedMinutesPerSubject.get(subjectId);
            int newTotal = minutes + (old == null ? 0 : old);
            completedMinutesPerSubject.put(subjectId, newTotal);
        }

        // Step 2: headline counts.
        int openTasks = 0;
        int overdueTasks = 0;
        for (Task task : allTasks) {
            if (!task.isCompleted()) {
                openTasks = openTasks + 1;
            }
            if (task.isOverdue(today)) {
                overdueTasks = overdueTasks + 1;
            }
        }

        int upcomingSessions = 0;
        for (StudySession session : allSessions) {
            if (!session.isCompleted()) {
                upcomingSessions = upcomingSessions + 1;
            }
        }

        // Step 3: the weekly goal progress, capped at 100 percent.
        int goal = getWeeklyGoalMinutes();
        int percentOfGoal = 0;
        if (goal > 0) {
            percentOfGoal = (int) Math.min(100, Math.round(100.0 * completedThisWeek / goal));
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
        summary.put("weeklyGoalMinutes", goal);
        summary.put("completedMinutesThisWeek", completedThisWeek);
        summary.put("percentOfGoal", percentOfGoal);
        summary.put("openTasks", openTasks);
        summary.put("overdueTasks", overdueTasks);
        summary.put("upcomingSessions", upcomingSessions);
        summary.put("subjects", bars);
        return summary;
    }

    public int getWeeklyGoalMinutes() {
        PlannerSettings row = settings.findById(PlannerSettings.SINGLETON_ID).orElse(null);
        if (row == null) {
            return DEFAULT_WEEKLY_GOAL_MINUTES;
        }
        return row.getWeeklyGoalMinutes();
    }

    @Transactional
    public int saveWeeklyGoal(int weeklyGoalMinutes) {
        PlannerSettings row = settings.findById(PlannerSettings.SINGLETON_ID).orElse(null);
        if (row == null) {
            // The entity starts with id = 1 already, so this becomes the first settings row.
            row = new PlannerSettings(weeklyGoalMinutes);
        } else {
            row.setWeeklyGoalMinutes(weeklyGoalMinutes);
        }
        settings.save(row);
        return row.getWeeklyGoalMinutes();
    }
}
