package studyplanner.lessons.lecture19;

// CSC2104.2 · Lecture 19: final and garbage collection
// A small study-planner example for this Java concept.

public class FinalAndGcDemo {
    static class StudyPlan {
        final String studentId;
        StudyPlan(String studentId) { this.studentId = studentId; }
    }

    public static void main(String[] args) {
        final int MAX_DAILY_MINUTES = 240;
        StudyPlan draft = new StudyPlan("S104");
        System.out.println(draft.studentId + " · " + MAX_DAILY_MINUTES + " min limit");

        draft = null; // the draft may now be eligible for garbage collection
        System.out.println("Draft reference cleared; collection timing is JVM-managed");
    }
}
