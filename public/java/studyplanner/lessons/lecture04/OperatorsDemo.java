package studyplanner.lessons.lecture04;

// CSC2104.1 · Lecture 4: Operators
// A small study-planner example for this Java concept.

public class OperatorsDemo {
    public static void main(String[] args) {
        int completedTasks = 6;
        int totalTasks = 8;
        double progress = completedTasks * 100.0 / totalTasks;
        int minutesAvailable = 45;
        boolean deadlineNear = true;
        boolean shouldPrioritize = deadlineNear && minutesAvailable >= 30;
        int completedAfterSession = completedTasks + 1;

        System.out.println("Progress: " + progress + "%");
        System.out.println("Prioritize next task: " + shouldPrioritize);
        System.out.println("Tasks after session: " + completedAfterSession);
    }
}
