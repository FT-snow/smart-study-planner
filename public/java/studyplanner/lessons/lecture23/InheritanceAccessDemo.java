package studyplanner.lessons.lecture23;

// CSC2104.3 · Lecture 23: Access modifiers in inheritance
// A small study-planner example for this Java concept.

class PersonRecord {
    private final String id;
    protected final String displayName;
    PersonRecord(String id, String displayName) {
        this.id = id;
        this.displayName = displayName;
    }
    public String getId() { return id; }
}

class StudentRecord extends PersonRecord {
    StudentRecord(String id, String name) { super(id, name); }
    String welcome() { return "Welcome, " + displayName; } // protected is inherited
}

public class InheritanceAccessDemo {
    public static void main(String[] args) {
        StudentRecord student = new StudentRecord("S104", "Ava Patel");
        System.out.println(student.welcome() + " · " + student.getId());
        // student.id is private and cannot be accessed here.
    }
}
