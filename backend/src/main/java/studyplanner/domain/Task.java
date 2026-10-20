package studyplanner.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

/**
 * A study task: one small piece of work, stored with two numbers
 * (its own id and the id of its subject) plus its details.
 */
@Entity
@Table(name = "tasks")
public class Task implements Completable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Which subject this task belongs to. Stored as the subject's id number. */
    @Column(nullable = false)
    private Long subjectId;

    @Column(nullable = false, length = 120)
    private String title;

    @Column(nullable = false)
    private LocalDate dueDate;

    @Column(nullable = false)
    private int estimatedMinutes;

    /** Priority written as text: "Low", "Medium" or "High". */
    @Column(nullable = false, length = 10)
    private String priority;

    private boolean completed;

    protected Task() {
        // A no-argument constructor is required by persistence, keep it.
    }

    public Task(Long subjectId, String title, LocalDate dueDate, int estimatedMinutes, String priority) {
        setSubjectId(subjectId);
        setTitle(title);
        setDueDate(dueDate);
        setEstimatedMinutes(estimatedMinutes);
        setPriority(priority);
    }

    public void setSubjectId(Long subjectId) {
        if (subjectId == null) {
            throw new IllegalArgumentException("A task must be connected to a subject.");
        }
        this.subjectId = subjectId;
    }

    public void setTitle(String title) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Task title is required.");
        }
        this.title = title.trim();
    }

    public void setDueDate(LocalDate dueDate) {
        if (dueDate == null) {
            throw new IllegalArgumentException("Task due date is required.");
        }
        this.dueDate = dueDate;
    }

    /** A task of 5 to 600 estimated minutes makes sense for one study day. */
    public void setEstimatedMinutes(int estimatedMinutes) {
        if (estimatedMinutes < 5 || estimatedMinutes > 600) {
            throw new IllegalArgumentException("Estimated minutes must be between 5 and 600.");
        }
        this.estimatedMinutes = estimatedMinutes;
    }

    /** Only "Low", "Medium" or "High" is accepted, letters in any case. */
    public void setPriority(String priority) {
        if (priority == null) {
            throw new IllegalArgumentException("Priority is required.");
        }
        String value = priority.trim();
        if (value.equalsIgnoreCase("Low")
                || value.equalsIgnoreCase("Medium")
                || value.equalsIgnoreCase("High")) {
            this.priority = value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase();
        } else {
            throw new IllegalArgumentException("Priority must be Low, Medium, or High.");
        }
    }

    /** Changes status to done. */
    public void markCompleted() {
        completed = true;
    }

    /** Changes status back to open. */
    public void reopen() {
        completed = false;
    }

    /** Completes or reopens, whichever way it currently is not. */
    public Task toggleDone() {
        if (isCompleted()) {
            reopen();
        } else {
            markCompleted();
        }
        return this;
    }

    /** A task is overdue when its due date passed and it is still open. */
    public boolean isOverdue(LocalDate today) {
        return !completed && dueDate.isBefore(today);
    }

    public Long getId() {
        return id;
    }

    public Long getSubjectId() {
        return subjectId;
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

    /** The promise made to the Completable interface (Lecture 30). */
    @Override
    public boolean isCompleted() {
        return completed;
    }

    @Override
    public String toString() {
        return title + " (" + priority + ", due " + dueDate + ")";
    }
}
