package studyplanner.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

/**
 * Turns rejected values into readable JSON errors for the page, so a wrong
 * input shows a message instead of a crash page.
 *
 * The @ResponseStatus lines decide the HTTP status code the browser sees
 * (400, 404, 500) while the methods simply return the message text.
 *
 * Lecture 37 idea, web edition: catch errors in one central place and
 * answer politely, instead of letting the app die mid-request.
 */
@RestControllerAdvice
public class ApiExceptionHandler {

    /** 400: a value was rejected by a setter or a controller rule. */
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> badValue(IllegalArgumentException exception) {
        return respond(HttpStatus.BAD_REQUEST, exception.getMessage());
    }

    /** 400: the request body was not valid JSON for the endpoint.
     *  Jackson puts the real problem (e.g. a setter rejecting "URGENT") into
     *  the cause, so we look one step deeper and keep only the first line. */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> notReadable(HttpMessageNotReadableException exception) {
        Throwable cause = exception.getCause();
        if (cause != null && cause.getMessage() != null) {
            String clean = cause.getMessage().split("\\n")[0];
            return respond(HttpStatus.BAD_REQUEST, clean);
        }
        return respond(HttpStatus.BAD_REQUEST, "The request body is not valid for this endpoint.");
    }

    /** 404: a subject, task or session was asked for but does not exist. */
    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, Object> notFound(NoSuchElementException exception) {
        return respond(HttpStatus.NOT_FOUND, exception.getMessage());
    }

    /** 500: safety net so unexpected problems still answer as JSON, not a crash page. */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, Object> unexpected(Exception exception) {
        return respond(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong on the server.");
    }

    private Map<String, Object> respond(HttpStatus status, String message) {
        Map<String, Object> body = new HashMap<String, Object>();
        body.put("timestamp", Instant.now().toString());
        body.put("status", status.value());
        body.put("message", message);
        return body;
    }
}
