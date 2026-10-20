package studyplanner.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/** The values the web page sends when saving the weekly goal. */
public class SettingsRequest {

    @NotNull
    @Min(60)
    @Max(4800)
    private Integer weeklyGoalMinutes;

    public Integer getWeeklyGoalMinutes() {
        return weeklyGoalMinutes;
    }

    public void setWeeklyGoalMinutes(Integer weeklyGoalMinutes) {
        this.weeklyGoalMinutes = weeklyGoalMinutes;
    }
}
