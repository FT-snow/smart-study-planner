package studyplanner;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/** Data access for study sessions. */
public interface StudySessionRepository extends JpaRepository<StudySession, Long> {

    List<StudySession> findBySubjectId(Long subjectId);

    @Transactional
    void deleteBySubjectId(Long subjectId);
}
