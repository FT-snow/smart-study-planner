package studyplanner.lessons.lecture02;

// CSC2104.1 · Lecture 2: Intro to OOP, history, benefits, vs procedural
// A small study-planner example for this Java concept.

public class OopIntroDemo {
    static class StudySession {
        private final String topic;
        private final int minutes;

        StudySession(String topic, int minutes) {
            this.topic = topic;
            this.minutes = minutes;
        }

        void printPlan() {
            System.out.println(topic + " — " + minutes + " min");
        }
    }

    public static void main(String[] args) {
        StudySession first = new StudySession("Classes", 30);
        StudySession second = new StudySession("Exceptions", 45);
        first.printPlan();
        second.printPlan();
    }
}
