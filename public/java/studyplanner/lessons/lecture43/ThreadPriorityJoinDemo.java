package studyplanner.lessons.lecture43;

// CSC2104.4 · Lecture 43: Priorities and join()
// A small study-planner example for this Java concept.

public class ThreadPriorityJoinDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread practice = new Thread(() -> System.out.println("Practice set finished"));
        Thread report = new Thread(() -> System.out.println("Progress report ready"));

        practice.setPriority(Thread.MAX_PRIORITY); // only a scheduling hint
        report.setPriority(Thread.MIN_PRIORITY);
        practice.start();
        practice.join(); // report waits for practice to finish
        report.start();
        report.join();
    }
}
