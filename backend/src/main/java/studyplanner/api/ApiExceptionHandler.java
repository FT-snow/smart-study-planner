package studyplanner.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import studyplanner.exception.BadRequestException;
import studyplanner.exception.NotFoundException;
import studyplanner.exception.PlannerException;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

/**
 * Turns every PlannerException (and failed input checks) into a clean JSON
 * body, so the page can show a readable message instead of a stack trace.
 */
@RestControllerAdvice
public class ApiExceptionHandler {

    /** The error shape the front end receives. */
    public static class ApiError {
        private String timestamp;
        private int status;
        private String message;
        private List<String> errors;

        public ApiError(int status, String message, List<String> errors) {
            this.timestamp = Instant.now().toString();
            this.status = status;
            this.message = message;
            this.errors = errors;
        }

        public String getTimestamp() {
            return timestamp;
        }

        public int getStatus() {
            return status;
        }

        public String getMessage() {
            return message;
        }

        public List<String> getErrors() {
            return errors;
        }
    }

    /** 404: the subject, task or session was not found. */
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiError> notFound(NotFoundException exception) {
        return respond(HttpStatus.NOT_FOUND, exception.getMessage(), null);
    }

    /** 400: the request violates a planner rule. */
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiError> badRequest(BadRequestException exception) {
        return respond(HttpStatus.BAD_REQUEST, exception.getMessage(), null);
    }

    /**
     * 400: input fields failed their checks (empty title, bad number...).
     * We collect one line per field so the front end can show details.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> invalid(MethodArgumentNotValidException exception) {
        List<String> fieldErrors = new ArrayList<String>();
        exception.getBindingResult().getFieldErrors().forEach(error ->
                fieldErrors.add(error.getField() + ": " + error.getDefaultMessage()));
        java.util.Collections.sort(fieldErrors);
        return respond(HttpStatus.BAD_REQUEST, "Request validation failed.", fieldErrors);
    }

    /** 400: a value was rejected by a setter inside the domain model. */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiError> illegalArgument(IllegalArgumentException exception) {
        return respond(HttpStatus.BAD_REQUEST, exception.getMessage(), null);
    }

    /** Safety net for any other planner exception. */
    @ExceptionHandler(PlannerException.class)
    public ResponseEntity<ApiError> plannerException(PlannerException exception) {
        return respond(HttpStatus.BAD_REQUEST, exception.getMessage(), null);
    }

    private ResponseEntity<ApiError> respond(HttpStatus status, String message, List<String> errors) {
        ApiError body = new ApiError(status.value(), message, errors == null ? List.of() : errors);
        return ResponseEntity.status(status).body(body);
    }
}
