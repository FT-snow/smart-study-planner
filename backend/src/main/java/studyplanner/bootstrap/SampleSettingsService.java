package studyplanner.bootstrap;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import studyplanner.domain.PlannerSettings;
import studyplanner.repo.PlannerSettingsRepository;

/**
 * Small helper so the settings row (id = 1) exists before anything reads it.
 */
@Service
public class SampleSettingsService {

    private final PlannerSettingsRepository settings;

    public SampleSettingsService(PlannerSettingsRepository settings) {
        this.settings = settings;
    }

    @Transactional
    public void ensureDefaults(int weeklyGoalMinutes) {
        PlannerSettings row = settings.findById(PlannerSettings.SINGLETON_ID)
                .orElseGet(() -> settings.save(new PlannerSettings(weeklyGoalMinutes)));
        row.setWeeklyGoalMinutes(weeklyGoalMinutes);
    }
}
