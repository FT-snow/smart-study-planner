package studyplanner.lessons.lecture33;

// CSC2104.3 · Lecture 33: Output and files (FileReader, FileWriter)
// A small study-planner example for this Java concept.

import java.io.FileReader;
import java.io.FileWriter;
import java.nio.file.Files;
import java.nio.file.Path;

public class FileHandlingBasics {
    public static void main(String[] args) throws Exception {
        Path log = Files.createTempFile("study-log", ".txt");
        try (FileWriter writer = new FileWriter(log.toFile())) {
            writer.write("09:00 — Reviewed arrays\n");
        }
        try (FileWriter append = new FileWriter(log.toFile(), true)) {
            append.write("09:30 — Completed quiz\n");
        }
        try (FileReader reader = new FileReader(log.toFile())) {
            int character;
            while ((character = reader.read()) != -1) System.out.print((char) character);
        }
        Files.deleteIfExists(log);
    }
}
