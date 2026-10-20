package studyplanner;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/** Data access for subjects. Declare the method names - Spring writes the bodies. */
public interface SubjectRepository extends JpaRepository<Subject, Long> {

    /** Spring reads the name and finds subjects whose code matches, any letter case. */
    Subject findByCodeIgnoreCase(String code);
}
