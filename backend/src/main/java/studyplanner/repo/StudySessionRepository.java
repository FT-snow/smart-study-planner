package studyplanner.repo;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import studyplanner.domain.StudySession;

import java.util.List;

/** Data access for study sessions. */
public interface StudySessionRepository extends JpaRepository<StudySession, Long> {

    List<StudySession> findBySubject_Id(Long subjectId);

    List<StudySession> findByCompletedTrue();

    @Transactional
    void deleteBySubject_Id(Long subjectId);
}
