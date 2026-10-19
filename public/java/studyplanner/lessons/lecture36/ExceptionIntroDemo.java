package studyplanner.lessons.lecture36;

// CSC2104.4 · Lecture 36: Exception handling intro, checked vs unchecked
// A small study-planner example for this Java concept.

import java.io.FileReader;
import java.io.IOException;

public class ExceptionIntroDemo {
    public static void main(String[] args) {
        try {
            new FileReader("missing-study-notes.txt"); // checked exception
        } catch (IOException error) {
            System.out.println("Notes file is unavailable");
        }

        try {
            int minutes = Integer.parseInt("forty"); // unchecked exception
            System.out.println(minutes);
        } catch (NumberFormatException error) {
            System.out.println("Enter study time as a number");
        }
    }
}
