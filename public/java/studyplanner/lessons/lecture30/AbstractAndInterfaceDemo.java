package studyplanner.lessons.lecture30;

// CSC2104.3 · Lecture 30: Abstract classes and interfaces
// A small study-planner example for this Java concept.

interface Trackable {
    int completedTopics();
}

abstract class StudyMember {
    private final String name;
    StudyMember(String name) { this.name = name; }
    String name() { return name; }
    abstract String nextStep();
}

class Student extends StudyMember implements Trackable {
    Student(String name) { super(name); }
    String nextStep() { return "Review constructors"; }
    public int completedTopics() { return 8; }
}

public class AbstractAndInterfaceDemo {
    public static void main(String[] args) {
        Student student = new Student("Ava Patel");
        System.out.println(student.name() + ": " + student.nextStep());
        System.out.println("Completed: " + student.completedTopics());
    }
}
