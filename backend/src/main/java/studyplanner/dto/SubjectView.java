package studyplanner.dto;

import studyplanner.domain.Subject;

/**
 * A subject as it is sent to the web page. "Data transfer object" — a
 * simple bag of values with getters, built from a Subject object.
 */
public class SubjectView {

    private Long id;
    private String code;
    private String name;
    private int targetMinutes;
    private String color;

    public SubjectView(Long id, String code, String name, int targetMinutes, String color) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.targetMinutes = targetMinutes;
        this.color = color;
    }

    /** Builds the view straight from a Subject object (Lecture 17: returning objects). */
    public static SubjectView from(Subject subject) {
        return new SubjectView(
                subject.getId(),
                subject.getCode(),
                subject.getName(),
                subject.getTargetMinutes(),
                subject.getColor());
    }

    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public int getTargetMinutes() {
        return targetMinutes;
    }

    public String getColor() {
        return color;
    }
}
