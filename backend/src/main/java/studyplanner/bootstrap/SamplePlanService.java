package studyplanner.bootstrap;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import studyplanner.domain.Priority;
import studyplanner.domain.StudySession;
import studyplanner.domain.Subject;
import studyplanner.domain.Task;
import studyplanner.repo.StudySessionRepository;
import studyplanner.repo.SubjectRepository;
import studyplanner.repo.TaskRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

/**
 * Creates the starter workspace shown to a first-time student and powers the
 * "Reset sample planner" action. Dates are always relative to today so the
 * sample plan looks fresh.
 */
@Service
public class SamplePlanService {

    static final int SAMPLE_WEEKLY_GOAL_MINUTES = 600;

    private final SubjectRepository subjects;
    private final TaskRepository tasks;
    private final StudySessionRepository sessions;
    private final SampleSettingsService settingsService;

    public SamplePlanService(SubjectRepository subjects, TaskRepository tasks,
                             StudySessionRepository sessions, SampleSettingsService settingsService) {
        this.subjects = subjects;
        this.tasks = tasks;
        this.sessions = sessions;
        this.settingsService = settingsService;
    }

    @Transactional
    public void seedIfEmpty() {
        settingsService.ensureDefaults(SAMPLE_WEEKLY_GOAL_MINUTES);
        if (subjects.count() == 0) {
            createSamplePlan();
        }
    }

    @Transactional
    public void resetToSamplePlan() {
        tasks.deleteAllInBatch();
        sessions.deleteAllInBatch();
        subjects.deleteAllInBatch();
        createSamplePlan();
    }

    private void createSamplePlan() {
        Subject java = subjects.save(new Subject("CSC2104", "Java OOP", 240, "blue"));
        Subject math = subjects.save(new Subject("MAT1201", "Discrete Mathematics", 180, "gold"));
        Subject physics = subjects.save(new Subject("PHY1102", "Physics", 120, "green"));
        Subject writing = subjects.save(new Subject("ENG1101", "Academic Writing", 60, "violet"));

        saveTasks(java, math, physics, writing);
        saveSessions(java, math, physics, writing);
    }

    private void saveTasks(Subject java, Subject math, Subject physics, Subject writing) {
        LocalDate today = LocalDate.now();
        List<Task> sample = List.of(
                new Task(java, "Review constructors and object setup", today.plusDays(1), 35, Priority.HIGH),
                new Task(math, "Finish induction practice set", today.plusDays(2), 45, Priority.MEDIUM),
                new Task(physics, "Summarize Newton's laws", today.plusDays(3), 30, Priority.LOW),
                new Task(writing, "Draft the assignment outline", today.plusDays(4), 25, Priority.MEDIUM));
        tasks.saveAll(sample);
    }

    private void saveSessions(Subject java, Subject math, Subject physics, Subject writing) {
        LocalDate today = LocalDate.now();
        List<StudySession> sample = List.of(
                new StudySession(java, "Build a StudySession class", today, LocalTime.of(16, 30), 40),
                new StudySession(math, "Work through induction examples", today.plusDays(1), LocalTime.of(17, 0), 50),
                new StudySession(java, "Practice inheritance questions", today.plusDays(3), LocalTime.of(15, 30), 45),
                new StudySession(physics, "Work through force diagrams", today.plusDays(4), LocalTime.of(16, 0), 35),
                new StudySession(writing, "Organize the essay outline", today.plusDays(5), LocalTime.of(14, 0), 30));
        sessions.saveAll(sample);
    }
}
