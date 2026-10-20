package studyplanner.dto;

import studyplanner.domain.PlannerSettings;

/** Weekly goal settings as they are sent to the web page. */
public class SettingsView {

    private int weeklyGoalMinutes;

    public SettingsView(int weeklyGoalMinutes) {
        this.weeklyGoalMinutes = weeklyGoalMinutes;
    }

    public static SettingsView from(PlannerSettings settings) {
        return new SettingsView(settings.getWeeklyGoalMinutes());
    }

    public int getWeeklyGoalMinutes() {
        return weeklyGoalMinutes;
    }
}
