package studyplanner.lessons.lecture20;

// CSC2104.2 · Lecture 20: Practice Session 4
// A small study-planner example for this Java concept.

public class PracticeSession4 {
    static class ProgressAccount {
        private int completedMinutes;
        private final int weeklyGoal = 300;

        void addStudy(int minutes) { completedMinutes += minutes; }
        int minutesRemaining() { return Math.max(0, weeklyGoal - completedMinutes); }
        int totalForDays(int minutesPerDay, int days) {
            if (days == 0) return 0;
            return minutesPerDay + totalForDays(minutesPerDay, days - 1);
        }
    }

    public static void main(String[] args) {
        ProgressAccount account = new ProgressAccount();
        account.addStudy(120);
        System.out.println("Goal remaining: " + account.minutesRemaining());
        System.out.println("Three-day plan: " + account.totalForDays(40, 3));
    }
}
