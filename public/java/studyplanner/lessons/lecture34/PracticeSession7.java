package studyplanner.lessons.lecture34;

// CSC2104.3 · Lecture 34: Practice Session 7
// A small study-planner example for this Java concept.

abstract class ProgressWriter {
    abstract String format(String subject, int minutes);
    void print(String subject, int minutes) {
        System.out.println(format(subject, minutes));
    }
}
class CsvWriter extends ProgressWriter {
    String format(String subject, int minutes) { return subject + "," + minutes; }
}
class TextWriter extends ProgressWriter {
    String format(String subject, int minutes) { return subject + ": " + minutes + " minutes"; }
}

public class PracticeSession7 {
    public static void main(String[] args) {
        ProgressWriter csv = new CsvWriter();
        ProgressWriter text = new TextWriter();
        csv.print("Java", 45);
        text.print("Java", 45);
    }
}
