package studyplanner.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import studyplanner.bootstrap.SamplePlanBootstrap;

/** Restores the sample subjects, tasks, and sessions. */
@RestController
public class PlannerAdminController {

    private final SamplePlanBootstrap bootstrap;

    public PlannerAdminController(SamplePlanBootstrap bootstrap) {
        this.bootstrap = bootstrap;
    }

    @PostMapping("/api/planner/reset")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void reset() {
        bootstrap.resetToSamplePlan();
    }
}
