package studyplanner.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import studyplanner.logic.ProgressCalculator;

import java.util.Map;

/** The dashboard summary: week bounds, goal progress, headline counts,
 *  and one progress bar per subject. Everything is computed by Java. */
@RestController
public class ProgressController {

    private final ProgressCalculator calculator;

    public ProgressController(ProgressCalculator calculator) {
        this.calculator = calculator;
    }

    @GetMapping("/api/progress")
    public Map<String, Object> progress() {
        return calculator.compute();
    }
}
