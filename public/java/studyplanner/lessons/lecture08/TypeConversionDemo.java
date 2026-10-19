package studyplanner.lessons.lecture08;

// CSC2104.1 · Lecture 8: Type conversion, wrapper classes, autoboxing/unboxing
// A small study-planner example for this Java concept.

import java.util.ArrayList;
import java.util.List;

public class TypeConversionDemo {
    public static void main(String[] args) {
        String formValue = "45";
        int minutes = Integer.parseInt(formValue); // String to primitive
        Integer boxedMinutes = minutes;             // autoboxing

        List<Integer> sessionLengths = new ArrayList<>();
        sessionLengths.add(boxedMinutes);
        int firstSession = sessionLengths.get(0);   // unboxing
        double hours = firstSession / 60.0;         // numeric conversion

        System.out.println("Minutes: " + firstSession + ", hours: " + hours);
    }
}
