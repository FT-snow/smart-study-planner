package studyplanner.lessons.lecture48;

// CSC2104.4 · Lecture 48: Practice Session 10
// A small study-planner example for this Java concept.

class FocusSlots {
    private int available = 1;

    synchronized void reserve(String student) throws InterruptedException {
        while (available == 0) wait();
        available--;
        System.out.println(student + " started a focus session");
    }

    synchronized void finish(String student) {
        System.out.println(student + " finished and released the slot");
        available++;
        notifyAll();
    }
}

public class PracticeSession10 {
    public static void main(String[] args) throws InterruptedException {
        FocusSlots slots = new FocusSlots();
        Runnable session = () -> {
            String student = Thread.currentThread().getName();
            try {
                slots.reserve(student);
                Thread.sleep(20);
                slots.finish(student);
            } catch (InterruptedException error) {
                Thread.currentThread().interrupt();
            }
        };
        Thread first = new Thread(session, "Ava");
        Thread second = new Thread(session, "Noah");
        first.start();
        second.start();
        first.join();
        second.join();
        System.out.println("Both planned sessions finished");
    }
}
