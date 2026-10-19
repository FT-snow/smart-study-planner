package studyplanner.lessons.lecture14;

// CSC2104.2 · Lecture 14: Method overloading
// A small study-planner example for this Java concept.

public class ProgressCalculator {
    public double calculate(int completedTasks, int totalTasks) {
        return totalTasks == 0 ? 0 : completedTasks * 100.0 / totalTasks;
    }

    public double calculate(double completedHours, double goalHours) {
        return goalHours == 0 ? 0 : completedHours * 100.0 / goalHours;
    }

    public static void main(String[] args) {
        ProgressCalculator progress = new ProgressCalculator();
        System.out.println(progress.calculate(3, 4) + "% tasks");
        System.out.println(progress.calculate(2.5, 5.0) + "% hours");
    }
}
