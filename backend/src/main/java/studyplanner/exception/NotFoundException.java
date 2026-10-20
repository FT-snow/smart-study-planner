package studyplanner.exception;

/** 404: the referenced subject, task, or session does not exist. */
public class NotFoundException extends PlannerException {

    public NotFoundException(String message) {
        super(message);
    }
}
