package studyplanner.lessons.lecture27;

// CSC2104.3 · Lecture 27: Method overriding
// A small study-planner example for this Java concept.

class StudyMember {
    String weeklyPlan() { return "Review your subjects"; }
}

class Student extends StudyMember {
    @Override
    String weeklyPlan() { return "Complete two practice sets"; }
}

class Tutor extends StudyMember {
    @Override
    String weeklyPlan() { return "Prepare a guided review"; }
}

public class MethodOverridingDemo {
    public static void main(String[] args) {
        System.out.println(new Student().weeklyPlan());
        System.out.println(new Tutor().weeklyPlan());
    }
}
