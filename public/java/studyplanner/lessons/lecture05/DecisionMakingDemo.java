package studyplanner.lessons.lecture05;

// CSC2104.1 · Lecture 5: Decision making (if-else, switch-case)
// A small study-planner example for this Java concept.

public class DecisionMakingDemo {
    public static void main(String[] args) {
        int daysUntilExam = 3;
        String priority;

        if (daysUntilExam <= 3) {
            priority = "High";
        } else if (daysUntilExam <= 10) {
            priority = "Medium";
        } else {
            priority = "Low";
        }

        String activity;
        switch ("practice") {
            case "practice" -> activity = "Solve questions";
            case "review" -> activity = "Review notes";
            default -> activity = "Read the next topic";
        }

        System.out.println(priority + " priority: " + activity);
    }
}
