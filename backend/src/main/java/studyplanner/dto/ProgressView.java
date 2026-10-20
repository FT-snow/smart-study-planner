package studyplanner.dto;

import java.time.LocalDate;
import java.util.List;

/**
 * The dashboard summary computed by Java: the current study week
 * (Mon–Sun), progress toward the weekly goal, headline counts and the
 * per-subject bars. The page displays these without any math of its own.
 */
public class ProgressView {

    private LocalDate weekStart;
    private LocalDate weekEnd;
    private int weeklyGoalMinutes;
    private int completedMinutesThisWeek;
    private int percentOfGoal;
    private int openTasks;
    private int overdueTasks;
    private int upcomingSessions;
    private List<SubjectProgress> subjects;

    public ProgressView(LocalDate weekStart, LocalDate weekEnd, int weeklyGoalMinutes,
                        int completedMinutesThisWeek, int percentOfGoal,
                        int openTasks, int overdueTasks, int upcomingSessions,
                        List<SubjectProgress> subjects) {
        this.weekStart = weekStart;
        this.weekEnd = weekEnd;
        this.weeklyGoalMinutes = weeklyGoalMinutes;
        this.completedMinutesThisWeek = completedMinutesThisWeek;
        this.percentOfGoal = percentOfGoal;
        this.openTasks = openTasks;
        this.overdueTasks = overdueTasks;
        this.upcomingSessions = upcomingSessions;
        this.subjects = subjects;
    }

    public LocalDate getWeekStart() {
        return weekStart;
    }

    public LocalDate getWeekEnd() {
        return weekEnd;
    }

    public int getWeeklyGoalMinutes() {
        return weeklyGoalMinutes;
    }

    public int getCompletedMinutesThisWeek() {
        return completedMinutesThisWeek;
    }

    public int getPercentOfGoal() {
        return percentOfGoal;
    }

    public int getOpenTasks() {
        return openTasks;
    }

    public int getOverdueTasks() {
        return overdueTasks;
    }

    public int getUpcomingSessions() {
        return upcomingSessions;
    }

    public List<SubjectProgress> getSubjects() {
        return subjects;
    }
}
