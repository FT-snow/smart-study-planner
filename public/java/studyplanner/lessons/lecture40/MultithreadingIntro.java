package studyplanner.lessons.lecture40;

// CSC2104.4 · Lecture 40: Multithreading intro
// A small study-planner example for this Java concept.

public class MultithreadingIntro {
    static void task(String name) {
        System.out.println(name + " on " + Thread.currentThread().getName());
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("Sequential:");
        task("Build flashcards");
        task("Calculate progress");

        System.out.println("Concurrent:");
        Thread cards = new Thread(() -> task("Build flashcards"));
        Thread progress = new Thread(() -> task("Calculate progress"));
        cards.start();
        progress.start();
        cards.join();
        progress.join();
    }
}
