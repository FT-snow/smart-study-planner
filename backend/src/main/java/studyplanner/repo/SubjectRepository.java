package studyplanner.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import studyplanner.domain.Subject;

import java.util.Optional;

/** Data access for subjects. */
public interface SubjectRepository extends JpaRepository<Subject, Long> {

    Optional<Subject> findByCodeIgnoreCase(String code);
}
