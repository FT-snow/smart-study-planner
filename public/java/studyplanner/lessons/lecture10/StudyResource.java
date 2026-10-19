package studyplanner.lessons.lecture10;

// CSC2104.1 · Lecture 10: Classes and objects
// A small study-planner example for this Java concept.

public class StudyResource {
    private final String title;
    private final String type;
    private boolean completed;

    public StudyResource(String title, String type) {
        this.title = title;
        this.type = type;
        this.completed = false;
    }

    public void markCompleted() {
        completed = true;
    }

    public String summary() {
        return title + " (" + type + ") — " + (completed ? "done" : "to review");
    }

    public static void main(String[] args) {
        StudyResource notes = new StudyResource("OOP notes", "PDF");
        notes.markCompleted();
        System.out.println(notes.summary());
    }
}
