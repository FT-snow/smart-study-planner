package studyplanner.domain;

/**
 * Completable is an interface (Lecture 30): a promise that a piece of work
 * can report whether it is done.
 *
 * <p>Both Task and StudySession promise to answer this question, so the
 * planner can treat them the same way when needed.</p>
 */
public interface Completable {

    boolean isCompleted();
}
