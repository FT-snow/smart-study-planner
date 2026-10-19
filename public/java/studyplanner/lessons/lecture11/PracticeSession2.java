package studyplanner.lessons.lecture11;

// CSC2104.1 · Lecture 11: Practice Session 2
// A small study-planner example for this Java concept.

public class PracticeSession2 {
    static class Resource {
        String title;
        int minutes;
        Resource(String title, int minutes) {
            this.title = title;
            this.minutes = minutes;
        }
    }

    public static void main(String[] args) {
        String csv = "OOP notes,20;Constructor video,35";
        String[] rows = csv.split(";");
        Resource[] resources = new Resource[rows.length];
        for (int i = 0; i < rows.length; i++) {
            String[] fields = rows[i].split(",");
            resources[i] = new Resource(fields[0], Integer.parseInt(fields[1]));
        }
        System.out.println(resources.length + " resources; first=" + resources[0].title);
    }
}
