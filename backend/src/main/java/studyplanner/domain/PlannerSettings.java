package studyplanner.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Global planner settings. Single row that always has id = 1, holding the
 * weekly study goal in minutes.
 */
@Entity
@Table(name = "planner_settings")
public class PlannerSettings {

    /** "final" concept (Lecture 19): this value never changes. */
    public static final long SINGLETON_ID = 1L;

    @Id
    private Long id = SINGLETON_ID;

    @Column(nullable = false)
    private int weeklyGoalMinutes;

    protected PlannerSettings() {
        // A no-argument constructor is required for persistence to work.
    }

    public PlannerSettings(int weeklyGoalMinutes) {
        setWeeklyGoalMinutes(weeklyGoalMinutes);
    }

    /** A goal between 1 and 80 hours per week keeps the plan realistic. */
    public void setWeeklyGoalMinutes(int weeklyGoalMinutes) {
        if (weeklyGoalMinutes < 60 || weeklyGoalMinutes > 4800) {
            throw new IllegalArgumentException("Weekly goal must be between 60 and 4800 minutes.");
        }
        this.weeklyGoalMinutes = weeklyGoalMinutes;
    }

    public Long getId() {
        return id;
    }

    public int getWeeklyGoalMinutes() {
        return weeklyGoalMinutes;
    }
}
