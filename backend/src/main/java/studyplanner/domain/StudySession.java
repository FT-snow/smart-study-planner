package studyplanner.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * One focused study session: what topic, on which day and time, how long.
 */
@Entity
@Table(name = "study_sessions")
public class StudySession implements Completable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @Column(nullable = false, length = 120)
    private String topic;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime time;

    @Column(nullable = false)
    private int durationMinutes;

    private boolean completed;

    protected StudySession() {
        // A no-argument constructor is required by persistence, keep it.
    }

    public StudySession(Subject subject, String topic, LocalDate date, LocalTime time, int durationMinutes) {
        if (subject == null) {
            throw new IllegalArgumentException("A session must belong to a subject.");
        }
        setTopic(topic);
        setDate(date);
        setTime(time);
        setDurationMinutes(durationMinutes);
        this.subject = subject;
    }

    public void setTopic(String topic) {
        if (topic == null || topic.trim().isEmpty()) {
            throw new IllegalArgumentException("Session topic is required.");
        }
        this.topic = topic.trim();
    }

    public void setDate(LocalDate date) {
        if (date == null) {
            throw new IllegalArgumentException("Session date is required.");
        }
        this.date = date;
    }

    public void setTime(LocalTime time) {
        if (time == null) {
            throw new IllegalArgumentException("Session time is required.");
        }
        this.time = time;
    }

    /** Sessions under 10 minutes or over 4 hours are not useful study blocks. */
    public void setDurationMinutes(int durationMinutes) {
        if (durationMinutes < 10 || durationMinutes > 240) {
            throw new IllegalArgumentException("Session duration must be between 10 and 240 minutes.");
        }
        this.durationMinutes = durationMinutes;
    }

    public void markCompleted() {
        completed = true;
    }

    public void reopen() {
        completed = false;
    }

    /** Completes or reopens, whichever way it currently is not. */
    public StudySession toggleDone() {
        if (isCompleted()) {
            reopen();
        } else {
            markCompleted();
        }
        return this;
    }

    public Long getId() {
        return id;
    }

    public Subject getSubject() {
        return subject;
    }

    public String getTopic() {
        return topic;
    }

    public LocalDate getDate() {
        return date;
    }

    public LocalTime getTime() {
        return time;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    /** The promise made to the Completable interface (Lecture 30). */
    @Override
    public boolean isCompleted() {
        return completed;
    }

    @Override
    public String toString() {
        return topic + " · " + date + " " + time + " (" + durationMinutes + " min)";
    }
}
