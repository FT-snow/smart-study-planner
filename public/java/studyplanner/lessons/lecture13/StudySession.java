package studyplanner.lessons.lecture13;

// CSC2104.1 · Lecture 13: Constructors
// A small study-planner example for this Java concept.

public class StudySession {
    private String topic;
    private int minutes;

    public StudySession() { this("Untitled review", 25); }

    public StudySession(String topic, int minutes) {
        this.topic = topic;
        this.minutes = minutes;
    }

    public StudySession(StudySession other) {
        this(other.topic, other.minutes);
    }

    public String summary() { return topic + " · " + minutes + " min"; }

    public static void main(String[] args) {
        StudySession first = new StudySession("Inheritance", 40);
        StudySession copy = new StudySession(first);
        System.out.println(copy.summary());
    }
}
