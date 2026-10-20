package studyplanner.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * The values the web page sends when creating a subject. Setters are used
 * to fill this object from the incoming request automatically.
 */
public class SubjectRequest {

    @NotBlank
    @Size(max = 20)
    private String code;

    @NotBlank
    @Size(max = 80)
    private String name;

    /** Weekly goal in minutes. */
    @NotNull
    private Integer targetMinutes;

    @Size(max = 20)
    private String color;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getTargetMinutes() {
        return targetMinutes;
    }

    public void setTargetMinutes(Integer targetMinutes) {
        this.targetMinutes = targetMinutes;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
