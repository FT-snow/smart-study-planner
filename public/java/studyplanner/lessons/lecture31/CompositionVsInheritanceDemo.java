package studyplanner.lessons.lecture31;

// CSC2104.3 · Lecture 31: Inheritance vs composition
// A small study-planner example for this Java concept.

import java.util.ArrayList;
import java.util.List;

class Mentor {
    String name;
    Mentor(String name) { this.name = name; }
}
class AdvancedMentor extends Mentor { // IS-A
    AdvancedMentor(String name) { super(name); }
}
class Subject { // HAS-A
    private final List<String> topics = new ArrayList<>();
    void addTopic(String topic) { topics.add(topic); }
    int topicCount() { return topics.size(); }
}

public class CompositionVsInheritanceDemo {
    public static void main(String[] args) {
        AdvancedMentor mentor = new AdvancedMentor("Dr. Rivera");
        Subject java = new Subject();
        java.addTopic("Classes");
        System.out.println(mentor.name + " · " + java.topicCount() + " topic");
    }
}
