package studyplanner.lessons.lecture25;

// CSC2104.3 · Lecture 25: Practice Session 5
// A small study-planner example for this Java concept.

class LearningMaterial {
    private final String title;
    LearningMaterial(String title) { this.title = title; }
    String title() { return title; }
    String open() { return "Opening " + title; }
}

class VideoLesson extends LearningMaterial {
    VideoLesson(String title) { super(title); }
    String open() { return super.open() + " in the video player"; }
}

public class PracticeSession5 {
    public static void main(String[] args) {
        System.out.println(new VideoLesson("Constructors").open());
    }
}
