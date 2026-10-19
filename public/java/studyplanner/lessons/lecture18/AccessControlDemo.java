package studyplanner.lessons.lecture18;

// CSC2104.2 · Lecture 18: Access control
// A small study-planner example for this Java concept.

class StudyProgress {
    private int quizScore = 86;       // only this class can read it directly
    protected String feedback = "Keep practising";
    String weeklyGoal = "5 hours";    // package-private
    public String studentName = "Ava Patel";

    public int getQuizScore() { return quizScore; }
}

public class AccessControlDemo {
    public static void main(String[] args) {
        StudyProgress progress = new StudyProgress();
        System.out.println(progress.studentName + " · " + progress.getQuizScore());
        // progress.quizScore is private, so this would not compile.
    }
}
