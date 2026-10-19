package studyplanner.lessons.lecture21;

// CSC2104.2 · Lecture 21: Nested and inner classes
// A small study-planner example for this Java concept.

public class StudyPlanner {
    static class Settings { int dailyGoalMinutes = 90; } // nested class

    interface StudyRule { boolean met(int minutes); }

    class DayPlan { // inner class belongs to a planner object
        String label = "Monday";
        String summary() { return label + " · " + settings.dailyGoalMinutes + " min goal"; }
    }

    private final Settings settings = new Settings();

    String reviewDay() {
        class GoalCheck { boolean met(int minutes) { return minutes >= settings.dailyGoalMinutes; } }
        GoalCheck check = new GoalCheck();
        StudyRule rule = new StudyRule() { // anonymous class for a one-off rule
            public boolean met(int minutes) { return minutes <= 120; }
        };
        return check.met(90) && rule.met(90) ? "Goal met" : "Adjust the plan";
    }

    public static void main(String[] args) {
        StudyPlanner planner = new StudyPlanner();
        System.out.println(planner.new DayPlan().summary());
        System.out.println(planner.reviewDay());
    }
}
