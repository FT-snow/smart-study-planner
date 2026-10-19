package studyplanner.lessons.lecture09;

// CSC2104.1 · Lecture 9: Arrays (single and multi-dimensional)
// A small study-planner example for this Java concept.

import java.util.Arrays;

public class ArraysDemo {
    public static void main(String[] args) {
        int[] quizScores = {72, 84, 91};
        String[][] week = {
            {"Java", "Math"},
            {"Writing", "Java"},
            {"Review", "Rest"}
        };

        System.out.println("Scores: " + Arrays.toString(quizScores));
        System.out.println("Tuesday first block: " + week[1][0]);
        System.out.println("Days planned: " + week.length);
    }
}
