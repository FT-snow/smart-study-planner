package studyplanner.lessons.lecture15;

// CSC2104.2 · Lecture 15: Objects as parameters, pass by value vs reference
// A small study-planner example for this Java concept.

public class ParameterPassingDemo {
    static class Task { String status = "Planned"; }

    static void update(int minutes, Task task, int[] weeklyHours) {
        minutes = 60;                 // changes only the local copy
        task.status = "Completed";   // changes the shared object
        weeklyHours[0] = 3;           // changes the shared array
    }

    public static void main(String[] args) {
        int minutes = 30;
        Task task = new Task();
        int[] hours = {1};
        update(minutes, task, hours);
        System.out.println(minutes + " / " + task.status + " / " + hours[0]);
    }
}
