package studyplanner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Smart Study Planner backend.
 *
 * <p>A Spring Boot REST API that owns all planner data and business rules
 * (subjects, tasks, study sessions, weekly goals). The Next.js front end in
 * the repository root is a pure client of this API.</p>
 */
@SpringBootApplication
public class StudyPlannerApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudyPlannerApplication.class, args);
    }
}
