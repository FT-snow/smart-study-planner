package studyplanner.domain;

/**
 * Priority of a study task.
 *
 * <p>Shows the enum concept (Lecture 05 style constants + a small method).
 * Each level has a number weight: HIGH wins when ordering tasks.</p>
 */
public enum Priority {
    LOW(1),
    MEDIUM(2),
    HIGH(3);

    private final int weight;

    Priority(int weight) {
        this.weight = weight;
    }

    public int getWeight() {
        return weight;
    }
}
