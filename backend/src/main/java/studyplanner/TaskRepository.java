package studyplanner;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/** Data access for study tasks. */
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findBySubjectId(Long subjectId);

    @Transactional
    void deleteBySubjectId(Long subjectId);
}
