package studyplanner.lessons.lecture42;

// CSC2104.4 · Lecture 42: Thread lifecycle, start(), run()
// A small study-planner example for this Java concept.

public class ThreadLifecycleDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread timer = new Thread(() -> {
            System.out.println("Timer task is running");
        });

        System.out.println("Before start: " + timer.getState());
        timer.start();                 // creates a new thread
        timer.join();
        System.out.println("After join: " + timer.getState());

        Thread directCall = new Thread(() -> System.out.println("Called by main"));
        directCall.run();              // ordinary method call; no new thread
        System.out.println("Direct-call state: " + directCall.getState());
    }
}
