package studyplanner.lessons.lecture46;

// CSC2104.4 · Lecture 46: Inter-thread communication (wait, notify)
// A small study-planner example for this Java concept.

import java.util.LinkedList;
import java.util.Queue;

class StudyTaskQueue {
    private final Queue<String> tasks = new LinkedList<>();

    synchronized void add(String task) {
        tasks.add(task);
        notifyAll();
    }

    synchronized String take() throws InterruptedException {
        while (tasks.isEmpty()) wait();
        return tasks.remove();
    }
}

public class InterThreadCommunicationDemo {
    public static void main(String[] args) throws InterruptedException {
        StudyTaskQueue queue = new StudyTaskQueue();
        Thread planner = new Thread(() -> {
            try { System.out.println("Next: " + queue.take()); }
            catch (InterruptedException error) { Thread.currentThread().interrupt(); }
        });
        planner.start();
        queue.add("Review constructors");
        planner.join();
    }
}
