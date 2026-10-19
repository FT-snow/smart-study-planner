package studyplanner.lessons.lecture17;

// CSC2104.2 · Lecture 17: Returning objects, recursion
// A small study-planner example for this Java concept.

public class ReturningObjectsDemo {
    static class Topic {
        String name;
        Topic left;
        Topic right;
        Topic(String name) { this.name = name; }
    }

    static Topic reschedule(Topic oldTopic, String newName) {
        return new Topic(newName); // return a new object
    }

    static int countTopics(Topic topic) {
        if (topic == null) return 0; // base case
        return 1 + countTopics(topic.left) + countTopics(topic.right);
    }

    public static void main(String[] args) {
        Topic java = new Topic("Java");
        java.left = new Topic("Classes");
        System.out.println(reschedule(java, "Java review").name);
        System.out.println("Topics: " + countTopics(java));
    }
}
