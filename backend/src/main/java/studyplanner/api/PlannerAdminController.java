package studyplanner.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import studyplanner.bootstrap.SamplePlanService;

/** Restores the sample subjects, tasks, and sessions. */
@RestController
@RequestMapping("/api/planner")
public class PlannerAdminController {

    private final SamplePlanService samplePlanService;

    public PlannerAdminController(SamplePlanService samplePlanService) {
        this.samplePlanService = samplePlanService;
    }

    @PostMapping("/reset")
    public ResponseEntity<Void> reset() {
        samplePlanService.resetToSamplePlan();
        return ResponseEntity.noContent().build();
    }
}
