package studyplanner.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import studyplanner.domain.Subject;
import studyplanner.repo.StudySessionRepository;
import studyplanner.repo.SubjectRepository;
import studyplanner.repo.TaskRepository;

import java.util.List;
import java.util.NoSuchElementException;

/** Subject endpoints: the course list the rest of the planner hangs from. */
@RestController
public class SubjectController {

    private final SubjectRepository subjects;
    private final TaskRepository tasks;
    private final StudySessionRepository sessions;

    public SubjectController(SubjectRepository subjects, TaskRepository tasks, StudySessionRepository sessions) {
        this.subjects = subjects;
        this.tasks = tasks;
        this.sessions = sessions;
    }

    @GetMapping("/api/subjects")
    public List<Subject> all() {
        return subjects.findAll();
    }

    /** Adds a subject. Fails when the course code is already in use. */
    @PostMapping("/api/subjects")
    @ResponseStatus(HttpStatus.CREATED)
    public Subject create(@RequestBody Subject body) {
        if (subjects.findByCodeIgnoreCase(body.getCode()).isPresent()) {
            throw new IllegalArgumentException("A subject with code " + body.getCode() + " already exists.");
        }
        return subjects.save(new Subject(
                body.getCode(), body.getName(), body.getTargetMinutes(), body.getColor()));
    }

    /** Removes the subject together with its tasks and sessions. */
    @DeleteMapping("/api/subjects/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable Long id) {
        Subject subject = subjects.findById(id).orElse(null);
        if (subject == null) {
            throw new NoSuchElementException("Subject " + id + " does not exist.");
        }
        tasks.deleteBySubjectId(subject.getId());
        sessions.deleteBySubjectId(subject.getId());
        subjects.delete(subject);
    }
}
