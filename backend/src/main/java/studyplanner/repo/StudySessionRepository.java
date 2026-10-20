package studyplanner.repo;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import studyplanner.domain.StudySession;

import java.util.List;

/** Data access for study sessions. Spring fills in the method bodies for us. */
public interface StudySessionRepository extends JpaRepository<StudySession, Long> {

    List<StudySession> findBySubjectId(Long subjectId);

    @Transactional
    void deleteBySubjectId(Long subjectId);
}
