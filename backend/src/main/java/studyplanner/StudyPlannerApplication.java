package studyplanner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The start button of the Smart Study Planner backend.
 *
 * Run it, and a web server starts on localhost:8080 that keeps every
 * subject, task and study session and answers the planner page.
 */
@SpringBootApplication
public class StudyPlannerApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudyPlannerApplication.class, args);
    }
}
