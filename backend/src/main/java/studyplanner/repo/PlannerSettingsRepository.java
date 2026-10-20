package studyplanner.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import studyplanner.domain.PlannerSettings;

/** Data access for the single-row settings table. */
public interface PlannerSettingsRepository extends JpaRepository<PlannerSettings, Long> {
}
