package studyplanner.lessons.lecture38;

// CSC2104.4 · Lecture 38: throw, throws, custom exceptions
// A small study-planner example for this Java concept.

class InvalidStudySessionException extends Exception {
    InvalidStudySessionException(String message) { super(message); }
}

class SessionValidator {
    static void validate(int minutes) throws InvalidStudySessionException {
        if (minutes < 15 || minutes > 240) {
            throw new InvalidStudySessionException("Session must be 15–240 minutes");
        }
    }
}

public class ThrowThrowsDemo {
    public static void main(String[] args) {
        try {
            SessionValidator.validate(10);
        } catch (InvalidStudySessionException error) {
            System.out.println(error.getMessage());
        }
    }
}
