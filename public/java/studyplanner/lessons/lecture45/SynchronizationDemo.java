package studyplanner.lessons.lecture45;

// CSC2104.4 · Lecture 45: Synchronization
// A small study-planner example for this Java concept.

class StudySlotAllocator {
    private boolean available = true;

    synchronized boolean reserve(String student) {
        if (!available) return false;
        available = false;
        System.out.println(student + " reserved the 4 PM slot");
        return true;
    }
}

public class SynchronizationDemo {
    public static void main(String[] args) throws InterruptedException {
        StudySlotAllocator allocator = new StudySlotAllocator();
        Thread first = new Thread(() -> allocator.reserve("Ava"));
        Thread second = new Thread(() -> allocator.reserve("Noah"));
        first.start();
        second.start();
        first.join();
        second.join();
    }
}
