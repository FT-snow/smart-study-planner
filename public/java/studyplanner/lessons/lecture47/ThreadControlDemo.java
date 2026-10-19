package studyplanner.lessons.lecture47;

// CSC2104.4 · Lecture 47: Pausing, resuming, and stopping threads safely
// A small study-planner example for this Java concept.

class FocusTimer implements Runnable {
    private boolean paused;
    private boolean stopped;

    synchronized void pauseTimer() {
        paused = true;
        System.out.println("Pause requested");
    }
    synchronized void resumeTimer() {
        paused = false;
        notifyAll();
        System.out.println("Resume requested");
    }
    synchronized void stopTimer() {
        stopped = true;
        notifyAll();
        System.out.println("Stop requested");
    }

    public void run() {
        try {
            while (true) {
                synchronized (this) {
                    while (paused && !stopped) wait();
                    if (stopped) break;
                }
                Thread.sleep(10);
            }
        } catch (InterruptedException error) {
            Thread.currentThread().interrupt();
        }
    }
}

public class ThreadControlDemo {
    public static void main(String[] args) throws InterruptedException {
        FocusTimer timer = new FocusTimer();
        Thread worker = new Thread(timer);
        worker.start();
        timer.pauseTimer();
        timer.resumeTimer();
        timer.stopTimer();
        worker.join();
        System.out.println("Timer stopped safely");
    }
}
