package studyplanner.lessons.lecture41;

// CSC2104.4 · Lecture 41: Creating threads (Thread and Runnable)
// A small study-planner example for this Java concept.

public class ThreadCreationDemo {
    static class FlashcardBuilder extends Thread {
        public void run() { System.out.println("Flashcards prepared"); }
    }

    public static void main(String[] args) throws InterruptedException {
        Thread fromClass = new FlashcardBuilder();
        Thread fromRunnable = new Thread(new Runnable() {
            public void run() { System.out.println("Progress calculated"); }
        });
        Thread fromLambda = new Thread(() -> System.out.println("Reminder queued"));

        fromClass.start();
        fromRunnable.start();
        fromLambda.start();
        fromClass.join();
        fromRunnable.join();
        fromLambda.join();
    }
}
