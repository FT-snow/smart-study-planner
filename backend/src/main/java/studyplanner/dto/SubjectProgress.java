package studyplanner.dto;

/** Progress numbers for one subject, used by the small bars in the UI. */
public class SubjectProgress {

    private Long subjectId;
    private String code;
    private String name;
    private String color;
    private int targetMinutes;
    private int completedMinutes;
    private int percentComplete;

    public SubjectProgress(Long subjectId, String code, String name, String color,
                           int targetMinutes, int completedMinutes, int percentComplete) {
        this.subjectId = subjectId;
        this.code = code;
        this.name = name;
        this.color = color;
        this.targetMinutes = targetMinutes;
        this.completedMinutes = completedMinutes;
        this.percentComplete = percentComplete;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public String getColor() {
        return color;
    }

    public int getTargetMinutes() {
        return targetMinutes;
    }

    public int getCompletedMinutes() {
        return completedMinutes;
    }

    public int getPercentComplete() {
        return percentComplete;
    }
}
