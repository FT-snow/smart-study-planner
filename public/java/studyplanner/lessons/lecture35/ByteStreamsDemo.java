package studyplanner.lessons.lecture35;

// CSC2104.3 · Lecture 35: Byte streams
// A small study-planner example for this Java concept.

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;

public class ByteStreamsDemo {
    public static void main(String[] args) throws Exception {
        Path source = Files.createTempFile("resource", ".bin");
        Path copy = Files.createTempFile("resource-copy", ".bin");
        try (FileOutputStream out = new FileOutputStream(source.toFile())) {
            out.write(new byte[] {74, 65, 86, 65});
        }
        try (FileInputStream in = new FileInputStream(source.toFile());
             FileOutputStream out = new FileOutputStream(copy.toFile())) {
            in.transferTo(out);
        }
        System.out.println("Copied " + Files.size(copy) + " bytes");
        Files.deleteIfExists(source);
        Files.deleteIfExists(copy);
    }
}
