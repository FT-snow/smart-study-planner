package studyplanner.lessons.lecture16;

// CSC2104.2 · Lecture 16: Practice Session 3
// A small study-planner example for this Java concept.

public class PracticeSession3 {
    static class PracticeBlock {
        String subject;
        int questions;
        PracticeBlock(String subject, int questions) {
            this.subject = subject;
            this.questions = questions;
        }
    }

    static PracticeBlock book(String subject) { return new PracticeBlock(subject, 5); }
    static PracticeBlock book(String subject, int questions) {
        return new PracticeBlock(subject, questions);
    }

    public static void main(String[] args) {
        System.out.println(book("Java").questions + " standard questions");
        System.out.println(book("Math", 12).questions + " custom questions");
    }
}
