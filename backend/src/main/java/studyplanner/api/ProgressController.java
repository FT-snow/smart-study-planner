package studyplanner.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import studyplanner.dto.ProgressView;
import studyplanner.service.ProgressCalculator;

/**
 * Dashboard summary: weekly goal progress, headline counts, per-subject
 * bars. All numbers are computed by Java, not the browser.
 */
@RestController
public class ProgressController {

    private final ProgressCalculator progressCalculator;

    public ProgressController(ProgressCalculator progressCalculator) {
        this.progressCalculator = progressCalculator;
    }

    @GetMapping("/api/progress")
    public ProgressView progress() {
        return progressCalculator.compute();
    }
}
