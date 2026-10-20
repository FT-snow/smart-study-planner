package studyplanner.api;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import studyplanner.dto.TaskRequest;
import studyplanner.dto.TaskView;
import studyplanner.service.PlannerService;

import java.util.List;

/** Task endpoints: the "next action" to-do list. */
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final PlannerService planner;

    public TaskController(PlannerService planner) {
        this.planner = planner;
    }

    @GetMapping
    public List<TaskView> list() {
        return planner.listTasks();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskView create(@Valid @RequestBody TaskRequest request) {
        return planner.addTask(request);
    }

    /** Completes a task, or reopens it if it was already done. */
    @PatchMapping("/{id}/toggle")
    public TaskView toggle(@PathVariable Long id) {
        return planner.toggleTask(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        planner.removeTask(id);
    }
}
