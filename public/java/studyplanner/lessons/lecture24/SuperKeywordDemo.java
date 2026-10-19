package studyplanner.lessons.lecture24;

// CSC2104.3 · Lecture 24: super keyword
// A small study-planner example for this Java concept.

class Person {
    private final String name;
    Person(String name) { this.name = name; }
    String describe() { return "Person: " + name; }
}

class Mentor extends Person {
    private final String subject;
    Mentor(String name, String subject) {
        super(name); // initialize the Person part first
        this.subject = subject;
    }
    String describeMentor() {
        return super.describe() + " · mentors " + subject;
    }
}

public class SuperKeywordDemo {
    public static void main(String[] args) {
        System.out.println(new Mentor("Dr. Rivera", "Java").describeMentor());
    }
}
