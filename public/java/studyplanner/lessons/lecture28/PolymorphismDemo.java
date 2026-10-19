package studyplanner.lessons.lecture28;

// CSC2104.3 · Lecture 28: Runtime polymorphism
// A small study-planner example for this Java concept.

import java.util.List;

class StudyMember {
    String weeklyPlan() { return "General review"; }
}
class Student extends StudyMember {
    @Override String weeklyPlan() { return "Solve practice questions"; }
}
class Tutor extends StudyMember {
    @Override String weeklyPlan() { return "Prepare a lesson"; }
}

public class PolymorphismDemo {
    public static void main(String[] args) {
        List<StudyMember> members = List.of(new Student(), new Tutor());
        for (StudyMember member : members) {
            System.out.println(member.weeklyPlan());
        }
    }
}
