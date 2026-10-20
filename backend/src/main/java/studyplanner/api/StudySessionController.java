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
import studyplanner.dto.SessionRequest;
import studyplanner.dto.SessionView;
import studyplanner.service.PlannerService;

import java.util.List;

/** Study session endpoints: the scheduled calendar of the planner. */
@RestController
@RequestMapping("/api/sessions")
public class StudySessionController {

    private final PlannerService planner;

    public StudySessionController(PlannerService planner) {
        this.planner = planner;
    }

    @GetMapping
    public List<SessionView> list() {
        return planner.listSessions();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SessionView create(@Valid @RequestBody SessionRequest request) {
        return planner.addSession(request);
    }

    /** Marks a session done, or un-marks it. Done sessions count toward the weekly goal. */
    @PatchMapping("/{id}/toggle")
    public SessionView toggle(@PathVariable Long id) {
        return planner.toggleSession(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        planner.removeSession(id);
    }
}
