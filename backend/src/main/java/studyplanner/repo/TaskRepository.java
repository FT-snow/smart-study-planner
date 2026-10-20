package studyplanner.repo;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import studyplanner.domain.Task;

import java.util.List;

/** Data access for study tasks. Spring fills in the method bodies for us. */
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findBySubjectId(Long subjectId);

    @Transactional
    void deleteBySubjectId(Long subjectId);
}
