package studyplanner.bootstrap;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/** Seeds the sample plan on first launch so the API is never empty. */
@Component
public class SampleDataInitializer implements CommandLineRunner {

    private final SamplePlanService samplePlanService;

    public SampleDataInitializer(SamplePlanService samplePlanService) {
        this.samplePlanService = samplePlanService;
    }

    @Override
    public void run(String... args) {
        samplePlanService.seedIfEmpty();
    }
}
