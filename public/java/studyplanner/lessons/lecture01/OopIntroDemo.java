package studyplanner.lessons.lecture01;

// CSC2104.1 · Lecture 1: Intro to OOP, history, benefits, vs procedural
// A small study-planner example for this Java concept.

public class OopIntroDemo {
    static class StudySession {
        String topic;
        int minutes;

        StudySession(String topic, int minutes) {
            this.topic = topic;
            this.minutes = minutes;
        }

        void start() {
            System.out.println("Study " + topic + " for " + minutes + " minutes");
        }
    }

    public static void main(String[] args) {
        // Procedural: data is passed to a separate function.
        printSession("Arrays", 25);

        // OOP: the object keeps its data and action together.
        new StudySession("Arrays", 25).start();
    }

    static void printSession(String topic, int minutes) {
        System.out.println("Study " + topic + " for " + minutes + " minutes");
    }
}
