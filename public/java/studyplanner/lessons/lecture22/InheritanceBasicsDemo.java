package studyplanner.lessons.lecture22;

// CSC2104.3 · Lecture 22: Inheritance basics
// A small study-planner example for this Java concept.

class Person {
    private final String name;
    Person(String name) { this.name = name; }
    String getName() { return name; }
}

class Student extends Person {
    private final String course;
    Student(String name, String course) {
        super(name);
        this.course = course;
    }
    String profile() { return getName() + " studies " + course; }
}

public class InheritanceBasicsDemo {
    public static void main(String[] args) {
        System.out.println(new Student("Ava Patel", "Java OOP").profile());
    }
}
