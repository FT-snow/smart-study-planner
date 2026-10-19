package studyplanner.lessons.lecture44;

// CSC2104.4 · Lecture 44: Practice Session 9
// A small study-planner example for this Java concept.

public class PracticeSession9 {
    static Thread task(String label) {
        return new Thread(() -> System.out.println(label + " complete"));
    }

    public static void main(String[] args) throws InterruptedException {
        Thread revision = task("Revision");
        Thread quiz = task("Quiz generation");
        Thread reminder = task("Reminder setup");

        revision.start();
        quiz.start();
        reminder.start();
        revision.join();
        quiz.join();
        reminder.join();
        System.out.println("Weekly plan can now be summarized");
    }
}
