package studyplanner.exception;

/**
 * Base class for every exception the public API can produce.
 *
 * <p>Subclasses map to HTTP status codes in the global exception handler,
 * so the API never leaks stack traces to the front end.</p>
 */
public abstract class PlannerException extends RuntimeException {

    protected PlannerException(String message) {
        super(message);
    }
}
