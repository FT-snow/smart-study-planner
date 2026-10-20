package studyplanner.dto;

import studyplanner.domain.Task;

import java.time.LocalDate;

/** A task as it is sent to the web page. */
public class TaskView {

    private Long id;
    private Long subjectId;
    private String subjectCode;
    private String subjectName;
    private String title;
    private LocalDate dueDate;
    private int estimatedMinutes;
    private String priority;
    private boolean completed;
    private boolean overdue;

    public TaskView(Long id, Long subjectId, String subjectCode, String subjectName, String title,
                    LocalDate dueDate, int estimatedMinutes, String priority,
                    boolean completed, boolean overdue) {
        this.id = id;
        this.subjectId = subjectId;
        this.subjectCode = subjectCode;
        this.subjectName = subjectName;
        this.title = title;
        this.dueDate = dueDate;
        this.estimatedMinutes = estimatedMinutes;
        this.priority = priority;
        this.completed = completed;
        this.overdue = overdue;
    }

    public static TaskView from(Task task, LocalDate today) {
        return new TaskView(
                task.getId(),
                task.getSubject().getId(),
                task.getSubject().getCode(),
                task.getSubject().getName(),
                task.getTitle(),
                task.getDueDate(),
                task.getEstimatedMinutes(),
                task.getPriority().name(),
                task.isCompleted(),
                task.isOverdue(today));
    }

    public Long getId() {
        return id;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public String getSubjectCode() {
        return subjectCode;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public String getTitle() {
        return title;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public int getEstimatedMinutes() {
        return estimatedMinutes;
    }

    public String getPriority() {
        return priority;
    }

    public boolean isCompleted() {
        return completed;
    }

    public boolean isOverdue() {
        return overdue;
    }
}
