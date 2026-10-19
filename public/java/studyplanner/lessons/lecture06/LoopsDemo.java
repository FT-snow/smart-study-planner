package studyplanner.lessons.lecture06;

// CSC2104.1 · Lecture 6: Loops (for, while, do-while)
// A small study-planner example for this Java concept.

public class LoopsDemo {
    public static void main(String[] args) {
        String[] topics = {"Classes", "Methods", "Constructors"};
        for (String topic : topics) {
            System.out.println("Review: " + topic);
        }

        int tasksLeft = 2;
        while (tasksLeft > 0) {
            System.out.println("Task completed; left=" + (--tasksLeft));
        }

        int attempts = 0;
        do {
            attempts++;
        } while (attempts < 2);
        System.out.println("Slot search attempts: " + attempts);
    }
}
