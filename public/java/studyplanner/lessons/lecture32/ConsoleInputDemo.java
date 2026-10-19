package studyplanner.lessons.lecture32;

// CSC2104.3 · Lecture 32: Console input (Scanner, BufferedReader)
// A small study-planner example for this Java concept.

import java.io.BufferedReader;
import java.io.StringReader;
import java.util.Scanner;

public class ConsoleInputDemo {
    public static void main(String[] args) throws Exception {
        // Preset text keeps the demo repeatable; use System.in for keyboard input.
        Scanner scanner = new Scanner("Ava Patel 60");
        String name = scanner.next() + " " + scanner.next();
        int dailyGoal = scanner.nextInt();

        BufferedReader reader = new BufferedReader(new StringReader("Java OOP"));
        String subject = reader.readLine();
        System.out.println(name + " plans " + dailyGoal + " minutes for " + subject);
        scanner.close();
        reader.close();
    }
}
