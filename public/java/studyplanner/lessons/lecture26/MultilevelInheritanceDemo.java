package studyplanner.lessons.lecture26;

// CSC2104.3 · Lecture 26: Multilevel hierarchy
// A small study-planner example for this Java concept.

class Person {
    String name;
    Person(String name) { this.name = name; }
}
class StudyMember extends Person {
    StudyMember(String name) { super(name); }
    String role() { return "study member"; }
}
class Mentor extends StudyMember {
    Mentor(String name) { super(name); }
    String role() { return "mentor"; }
}
class AdvancedMentor extends Mentor {
    AdvancedMentor(String name) { super(name); }
    String focus() { return "exam strategy"; }
}

public class MultilevelInheritanceDemo {
    public static void main(String[] args) {
        AdvancedMentor mentor = new AdvancedMentor("Dr. Rivera");
        System.out.println(mentor.name + " · " + mentor.role() + " · " + mentor.focus());
    }
}
