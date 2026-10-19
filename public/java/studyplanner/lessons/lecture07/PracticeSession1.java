package studyplanner.lessons.lecture07;

// CSC2104.1 · Lecture 7: Practice Session 1
// A small study-planner example for this Java concept.

public class PracticeSession1 {
    public static void main(String[] args) {
        String[] subjects = {"Java", "Math", "Writing"};
        int[] plannedHours = {4, 3, 2};
        int[] studiedHours = {3, 2, 2};
        int totalPlanned = 0;
        int totalStudied = 0;

        for (int i = 0; i < subjects.length; i++) {
            totalPlanned += plannedHours[i];
            totalStudied += studiedHours[i];
            System.out.println(subjects[i] + ": " + studiedHours[i] + "/" + plannedHours[i] + "h");
        }
        System.out.println("Weekly progress: " + totalStudied + "/" + totalPlanned + "h");
    }
}
