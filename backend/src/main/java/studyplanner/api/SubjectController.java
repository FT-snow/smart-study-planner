package studyplanner.api;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import studyplanner.dto.SubjectRequest;
import studyplanner.dto.SubjectView;
import studyplanner.service.PlannerService;

import java.util.List;

/** Subject endpoints: the course list the rest of the planner hangs from. */
@RestController
@RequestMapping("/api/subjects")
public class SubjectController {

    private final PlannerService planner;

    public SubjectController(PlannerService planner) {
        this.planner = planner;
    }

    @GetMapping
    public List<SubjectView> list() {
        return planner.listSubjects();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SubjectView create(@Valid @RequestBody SubjectRequest request) {
        return planner.addSubject(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        planner.removeSubject(id);
    }
}
