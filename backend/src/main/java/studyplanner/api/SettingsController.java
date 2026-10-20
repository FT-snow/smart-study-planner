package studyplanner.api;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import studyplanner.dto.SettingsRequest;
import studyplanner.dto.SettingsView;
import studyplanner.service.ProgressCalculator;

/** Weekly goal settings. */
@RestController
@RequestMapping("/api/settings")
public class SettingsController {

    private final ProgressCalculator progressCalculator;

    public SettingsController(ProgressCalculator progressCalculator) {
        this.progressCalculator = progressCalculator;
    }

    @GetMapping
    public SettingsView get() {
        return new SettingsView(progressCalculator.getWeeklyGoalMinutes());
    }

    @PutMapping
    public SettingsView update(@Valid @RequestBody SettingsRequest request) {
        return progressCalculator.saveWeeklyGoal(request.getWeeklyGoalMinutes());
    }
}
