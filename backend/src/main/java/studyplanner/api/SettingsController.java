package studyplanner.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import studyplanner.logic.ProgressCalculator;

import java.util.HashMap;
import java.util.Map;

/** Reads and saves the weekly study goal (in minutes). */
@RestController
public class SettingsController {

    private final ProgressCalculator calculator;

    public SettingsController(ProgressCalculator calculator) {
        this.calculator = calculator;
    }

    @GetMapping("/api/settings")
    public Map<String, Object> get() {
        Map<String, Object> settings = new HashMap<String, Object>();
        settings.put("weeklyGoalMinutes", calculator.getWeeklyGoalMinutes());
        return settings;
    }

    @PutMapping("/api/settings")
    public Map<String, Object> update(@RequestBody Map<String, Object> body) {
        Object value = body.get("weeklyGoalMinutes");
        if (!(value instanceof Number)) {
            // Wrong JSON or the field is missing -> treated as a client mistake (400).
            throw new IllegalArgumentException("Weekly goal is required as a number of minutes.");
        }
        int saved = calculator.saveWeeklyGoal(((Number) value).intValue());

        Map<String, Object> settings = new HashMap<String, Object>();
        settings.put("weeklyGoalMinutes", saved);
        return settings;
    }
}
