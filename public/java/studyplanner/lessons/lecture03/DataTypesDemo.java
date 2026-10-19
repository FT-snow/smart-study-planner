package studyplanner.lessons.lecture03;

// CSC2104.1 · Lecture 3: Datatypes and variables
// A small study-planner example for this Java concept.

public class DataTypesDemo {
    public static void main(String[] args) {
        int semester = 2;
        long minutesStudied = 315L;
        double quizScore = 87.5;
        char grade = 'B';
        boolean examSoon = true;
        String subject = "Java OOP";
        var dailyGoalMinutes = 60;
        final int MAX_SESSION_MINUTES = 120;

        System.out.println(subject + " · semester " + semester);
        System.out.println(minutesStudied + " minutes, score " + quizScore);
        System.out.println("Exam soon: " + examSoon + ", grade: " + grade);
        System.out.println("Goal: " + dailyGoalMinutes + ", max session: " + MAX_SESSION_MINUTES);
    }
}
