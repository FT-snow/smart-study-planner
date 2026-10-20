package studyplanner.exception;

/** 400: the request was understood but violates a planner rule. */
public class BadRequestException extends PlannerException {

    public BadRequestException(String message) {
        super(message);
    }
}
