package studyplanner.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import studyplanner.domain.StudySession;
import studyplanner.repo.StudySessionRepository;
import studyplanner.repo.SubjectRepository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;

/** Study session endpoints: the scheduled calendar of the planner.
 *  Sessions always come back sorted: soonest date and time first. */
@RestController
public class StudySessionController {

    private final StudySessionRepository sessions;
    private final SubjectRepository subjects;

    public StudySessionController(StudySessionRepository sessions, SubjectRepository subjects) {
        this.sessions = sessions;
        this.subjects = subjects;
    }

    @GetMapping("/api/sessions")
    public List<StudySession> all() {
        List<StudySession> all = sessions.findAll();

        // Lecture 21 style: an anonymous class that knows how to compare two sessions.
        all.sort(new Comparator<StudySession>() {
            public int compare(StudySession a, StudySession b) {
                int byDate = a.getDate().compareTo(b.getDate());
                if (byDate != 0) {
                    return byDate;
                }
                int byTime = a.getTime().compareTo(b.getTime());
                if (byTime != 0) {
                    return byTime;
                }
                return Long.compare(a.getId(), b.getId());
            }
        });
        return all;
    }

    /** Schedules a session, but only if the subject it points at really exists. */
    @PostMapping("/api/sessions")
    @ResponseStatus(HttpStatus.CREATED)
    public StudySession create(@RequestBody StudySession body) {
        if (subjects.findById(body.getSubjectId()).isEmpty()) {
            throw new NoSuchElementException("Subject " + body.getSubjectId() + " does not exist.");
        }
        return sessions.save(new StudySession(
                body.getSubjectId(),
                body.getTopic(),
                body.getDate(),
                body.getTime(),
                body.getDurationMinutes()));
    }

    /** Marks a session done, or un-marks it. Done sessions count toward the weekly goal. */
    @PatchMapping("/api/sessions/{id}/toggle")
    public StudySession toggle(@PathVariable Long id) {
        StudySession session = sessions.findById(id).orElse(null);
        if (session == null) {
            throw new NoSuchElementException("Session " + id + " does not exist.");
        }
        session.toggleDone();
        return sessions.save(session);
    }
}
