package studyplanner.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import studyplanner.domain.Task;
import studyplanner.repo.SubjectRepository;
import studyplanner.repo.TaskRepository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;

/** Task endpoints: the "next action" to-do list. */
@RestController
public class TaskController {

    private final TaskRepository tasks;
    private final SubjectRepository subjects;

    public TaskController(TaskRepository tasks, SubjectRepository subjects) {
        this.tasks = tasks;
        this.subjects = subjects;
    }

    /** Open tasks first (oldest due date first); completed tasks sink to the bottom. */
    @GetMapping("/api/tasks")
    public List<Task> all() {
        List<Task> open = new ArrayList<Task>();
        List<Task> done = new ArrayList<Task>();
        for (Task task : tasks.findAll()) {
            if (task.isCompleted()) {
                done.add(task);
            } else {
                open.add(task);
            }
        }

        // Lecture 21 style: an anonymous class that knows how to compare two tasks.
        open.sort(new Comparator<Task>() {
            public int compare(Task a, Task b) {
                int byDate = a.getDueDate().compareTo(b.getDueDate());
                if (byDate != 0) {
                    return byDate;
                }
                return Long.compare(a.getId(), b.getId());
            }
        });
        done.sort(new Comparator<Task>() {
            public int compare(Task a, Task b) {
                int byDate = a.getDueDate().compareTo(b.getDueDate());
                if (byDate != 0) {
                    return byDate;
                }
                return Long.compare(a.getId(), b.getId());
            }
        });

        List<Task> ordered = new ArrayList<Task>();
        ordered.addAll(open);
        ordered.addAll(done);
        return ordered;
    }

    /** Adds a task, but only if the subject it points at really exists. */
    @PostMapping("/api/tasks")
    @ResponseStatus(HttpStatus.CREATED)
    public Task create(@RequestBody Task body) {
        if (subjects.findById(body.getSubjectId()).isEmpty()) {
            throw new NoSuchElementException("Subject " + body.getSubjectId() + " does not exist.");
        }
        return tasks.save(new Task(
                body.getSubjectId(),
                body.getTitle(),
                body.getDueDate(),
                body.getEstimatedMinutes(),
                body.getPriority()));
    }

    /** Completes a task, or reopens it if it was already complete. */
    @PatchMapping("/api/tasks/{id}/toggle")
    public Task toggle(@PathVariable Long id) {
        Task task = tasks.findById(id).orElse(null);
        if (task == null) {
            throw new NoSuchElementException("Task " + id + " does not exist.");
        }
        task.toggleDone();
        return tasks.save(task);
    }
}
