package studyplanner.lessons.lecture29;

// CSC2104.3 · Lecture 29: Practice Session 6
// A small study-planner example for this Java concept.

interface ReminderChannel {
    void send(String message);
}

class EmailReminder implements ReminderChannel {
    public void send(String message) { System.out.println("Email: " + message); }
}
class CalendarReminder implements ReminderChannel {
    public void send(String message) { System.out.println("Calendar: " + message); }
}

public class PracticeSession6 {
    static void remind(ReminderChannel channel) {
        channel.send("Java review starts at 4 PM");
    }
    public static void main(String[] args) {
        remind(new EmailReminder());
        remind(new CalendarReminder());
    }
}
