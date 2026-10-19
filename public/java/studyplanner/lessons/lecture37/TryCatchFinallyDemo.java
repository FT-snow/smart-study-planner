package studyplanner.lessons.lecture37;

// CSC2104.4 · Lecture 37: try, catch, finally
// A small study-planner example for this Java concept.

import java.io.BufferedReader;
import java.io.StringReader;

public class TryCatchFinallyDemo {
    public static void main(String[] args) {
        BufferedReader reader = new BufferedReader(new StringReader("Java review"));
        try {
            System.out.println(reader.readLine());
        } catch (java.io.IOException error) {
            System.out.println("Could not read the study note");
        } finally {
            try { reader.close(); } catch (java.io.IOException ignored) { }
            System.out.println("Reader closed");
        }

        try (BufferedReader safe = new BufferedReader(new StringReader("Task list"))) {
            System.out.println(safe.readLine());
        } catch (java.io.IOException error) {
            System.out.println("Could not read tasks");
        }
    }
}
