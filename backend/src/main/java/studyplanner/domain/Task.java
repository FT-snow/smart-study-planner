package studyplanner.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDate;

/**
 * A study task: one small piece of work belonging to a subject, with a due
 * date and a priority.
 *
 * <p>Composition (Lecture 31): a Task HAS-A Subject. The task holds a
 * reference to a subject object instead of copying its fields.</p>
 */
@Entity
@Table(name = "tasks")
public class Task implements Completable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @Column(nullable = false, length = 120)
    private String title;

    @Column(nullable = false)
    private LocalDate dueDate;

    @Column(nullable = false)
    private int estimatedMinutes;

    /** Enum field: LOW, MEDIUM or HIGH (see the Priority enum). */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Priority priority;

    private boolean completed;

    protected Task() {
        // A no-argument constructor is required by persistence, keep it.
    }

    public Task(Subject subject, String title, LocalDate dueDate, int estimatedMinutes, Priority priority) {
        if (subject == null) {
            throw new IllegalArgumentException("A task must belong to a subject.");
        }
        setTitle(title);
        setDueDate(dueDate);
        setEstimatedMinutes(estimatedMinutes);
        setPriority(priority);
        this.subject = subject;
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

    public void setPriority(Priority priority) {
        if (priority == null) {
            throw new IllegalArgumentException("Priority is required.");
        }
        this.priority = priority;
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

    public Subject getSubject() {
        return subject;
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

    public Priority getPriority() {
        return priority;
    }

    /** The promise made to the Completable interface (Lecture 30). */
    @Override
    public boolean isCompleted() {
        return completed;
    }

    @Override
    public String toString() {
        return title + " (" + priority.name() + ", due " + dueDate + ")";
    }
}
