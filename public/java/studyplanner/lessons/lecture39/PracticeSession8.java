package studyplanner.lessons.lecture39;

// CSC2104.4 · Lecture 39: Practice Session 8
// A small study-planner example for this Java concept.

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class PracticeSession8 {
    public static void main(String[] args) throws IOException {
        String csv = "Java,45\nMath,30\nInvalid row\nWriting,20";
        Path file = Files.createTempFile("study-tasks", ".csv");
        Files.writeString(file, csv); // save sample data
        List<String> tasks = new ArrayList<>();

        for (String line : Files.readAllLines(file)) { // load rows
            String[] fields = line.split(",");
            if (fields.length != 2) {
                System.out.println("Skipped malformed row: " + line);
                continue;
            }
            try {
                tasks.add(fields[0] + " · " + Integer.parseInt(fields[1]) + " min");
            } catch (NumberFormatException error) {
                System.out.println("Skipped invalid duration: " + line);
            }
        }
        System.out.println("Loaded " + tasks.size() + " study blocks");
        Files.deleteIfExists(file);
    }
}
