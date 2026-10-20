package studyplanner.repo;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import studyplanner.domain.Task;

import java.util.List;

/** Data access for study tasks. */
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findBySubject_Id(Long subjectId);

    @Transactional
    void deleteBySubject_Id(Long subjectId);
}
