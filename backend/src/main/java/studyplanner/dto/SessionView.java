package studyplanner.dto;

import studyplanner.domain.StudySession;

import java.time.LocalDate;
import java.time.LocalTime;

/** A study session as it is sent to the web page. */
public class SessionView {

    private Long id;
    private Long subjectId;
    private String subjectName;
    private String topic;
    private LocalDate date;
    private LocalTime time;
    private int durationMinutes;
    private boolean completed;

    public SessionView(Long id, Long subjectId, String subjectName, String topic,
                       LocalDate date, LocalTime time, int durationMinutes, boolean completed) {
        this.id = id;
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.topic = topic;
        this.date = date;
        this.time = time;
        this.durationMinutes = durationMinutes;
        this.completed = completed;
    }

    public static SessionView from(StudySession session) {
        return new SessionView(
                session.getId(),
                session.getSubject().getId(),
                session.getSubject().getName(),
                session.getTopic(),
                session.getDate(),
                session.getTime(),
                session.getDurationMinutes(),
                session.isCompleted());
    }

    public Long getId() {
        return id;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public String getSubjectName() {
        return subjectName;
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

    public boolean isCompleted() {
        return completed;
    }
}
