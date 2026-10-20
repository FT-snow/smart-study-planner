package studyplanner;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Two jobs in one small class:
 *   1. when the app starts, create the sample plan (if nothing exists yet);
 *   2. restore that plan when the "Reset sample planner" button is pressed.
 *
 * Dates are computed from today so the sample plan always looks fresh.
 */
@Component
public class SamplePlanBootstrap implements CommandLineRunner {

    private final SubjectRepository subjects;
    private final TaskRepository tasks;
    private final StudySessionRepository sessions;

    public SamplePlanBootstrap(SubjectRepository subjects, TaskRepository tasks, StudySessionRepository sessions) {
        this.subjects = subjects;
        this.tasks = tasks;
        this.sessions = sessions;
    }

    /** Called by Spring once when the app starts. */
    @Override
    @Transactional
    public void run(String... args) {
        ProgressCalculator.setWeeklyGoalMinutes(ProgressCalculator.DEFAULT_WEEKLY_GOAL_MINUTES);
        if (subjects.count() == 0) {
            createSamplePlan();
        }
    }

    /** Deletes everything and puts the fresh sample plan back. */
    @Transactional
    public void resetToSamplePlan() {
        tasks.deleteAllInBatch();
        sessions.deleteAllInBatch();
        subjects.deleteAllInBatch();
        ProgressCalculator.setWeeklyGoalMinutes(ProgressCalculator.DEFAULT_WEEKLY_GOAL_MINUTES);
        createSamplePlan();
    }

    private void createSamplePlan() {
        Subject java = subjects.save(new Subject("CSC2104", "Java OOP", 240, "blue"));
        Subject math = subjects.save(new Subject("MAT1201", "Discrete Mathematics", 180, "gold"));
        Subject physics = subjects.save(new Subject("PHY1102", "Physics", 120, "green"));
        Subject writing = subjects.save(new Subject("ENG1101", "Academic Writing", 60, "violet"));

        LocalDate today = LocalDate.now();

        List<Task> sampleTasks = new ArrayList<Task>();
        sampleTasks.add(new Task(java.getId(), "Review constructors and object setup", today.plusDays(1), 35, "High"));
        sampleTasks.add(new Task(math.getId(), "Finish induction practice set", today.plusDays(2), 45, "Medium"));
        sampleTasks.add(new Task(physics.getId(), "Summarize Newton's laws", today.plusDays(3), 30, "Low"));
        sampleTasks.add(new Task(writing.getId(), "Draft the assignment outline", today.plusDays(4), 25, "Medium"));
        tasks.saveAll(sampleTasks);

        List<StudySession> sampleSessions = new ArrayList<StudySession>();
        sampleSessions.add(new StudySession(java.getId(), "Build a StudySession class", today, LocalTime.of(16, 30), 40));
        sampleSessions.add(new StudySession(math.getId(), "Work through induction examples", today.plusDays(1), LocalTime.of(17, 0), 50));
        sampleSessions.add(new StudySession(java.getId(), "Practice inheritance questions", today.plusDays(3), LocalTime.of(15, 30), 45));
        sampleSessions.add(new StudySession(physics.getId(), "Work through force diagrams", today.plusDays(4), LocalTime.of(16, 0), 35));
        sampleSessions.add(new StudySession(writing.getId(), "Organize the essay outline", today.plusDays(5), LocalTime.of(14, 0), 30));
        sessions.saveAll(sampleSessions);
    }
}
