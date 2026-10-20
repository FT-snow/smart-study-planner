package studyplanner.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * A subject (course) the student is studying, e.g. "CSC2104 Java OOP".
 *
 * <p>Encapsulation (Lecture 18): every field is private, values can only
 * enter through constructors and setters that check the data first, and
 * outside code reads values through getters.</p>
 */
@Entity
@Table(name = "subjects")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String code;

    @Column(nullable = false, length = 80)
    private String name;

    /** Weekly study target in minutes. */
    @Column(nullable = false)
    private int targetMinutes;

    /** Label color for the web page: blue, gold, green or violet. */
    @Column(nullable = false, length = 20)
    private String color;

    protected Subject() {
        // A no-argument constructor is required by persistence, keep it.
    }

    public Subject(String code, String name, int targetMinutes, String color) {
        setCode(code);
        setName(name);
        setTargetMinutes(targetMinutes);
        setColor(color);
    }

    public void setCode(String code) {
        if (code == null || code.trim().isEmpty()) {
            throw new IllegalArgumentException("Subject code is required.");
        }
        this.code = code.trim();
    }

    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Subject name is required.");
        }
        this.name = name.trim();
    }

    /** At least 15 minutes per week, at most 40 hours. */
    public void setTargetMinutes(int targetMinutes) {
        if (targetMinutes < 15 || targetMinutes > 2400) {
            throw new IllegalArgumentException("Weekly target must be between 15 and 2400 minutes.");
        }
        this.targetMinutes = targetMinutes;
    }

    public void setColor(String color) {
        if (color == null || color.trim().isEmpty()) {
            this.color = "blue"; // a sensible default
        } else {
            this.color = color.trim();
        }
    }

    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public int getTargetMinutes() {
        return targetMinutes;
    }

    public String getColor() {
        return color;
    }

    /** Method overriding (Lecture 27): we replace the version from Object. */
    @Override
    public String toString() {
        return code + " · " + name;
    }
}
