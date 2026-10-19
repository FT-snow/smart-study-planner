export type LessonExample = {
  file: string;
  code: string;
  output: string;
  walkthrough: string[];
};

// These are teaching examples shown by the frontend. The output is illustrative;
// the browser does not compile or execute Java.
export const lessonExamples: Record<number, LessonExample> = {
  1: {
    file: "studyplanner/intro/OopIntroDemo.java",
    code: String.raw`public class OopIntroDemo {
    static class StudySession {
        String topic;
        int minutes;

        StudySession(String topic, int minutes) {
            this.topic = topic;
            this.minutes = minutes;
        }

        void start() {
            System.out.println("Study " + topic + " for " + minutes + " minutes");
        }
    }

    public static void main(String[] args) {
        // Procedural: data is passed to a separate function.
        printSession("Arrays", 25);

        // OOP: the object keeps its data and action together.
        new StudySession("Arrays", 25).start();
    }

    static void printSession(String topic, int minutes) {
        System.out.println("Study " + topic + " for " + minutes + " minutes");
    }
}`,
    output: "Study Arrays for 25 minutes\nStudy Arrays for 25 minutes",
    walkthrough: [
      "The procedural method receives separate values and prints them.",
      "StudySession stores the same values in fields and provides start().",
      "Both approaches work; objects keep related study data and behavior together.",
    ],
  },
  2: {
    file: "studyplanner/intro/OopIntroDemo.java",
    code: String.raw`public class OopIntroDemo {
    static class StudySession {
        private final String topic;
        private final int minutes;

        StudySession(String topic, int minutes) {
            this.topic = topic;
            this.minutes = minutes;
        }

        void printPlan() {
            System.out.println(topic + " — " + minutes + " min");
        }
    }

    public static void main(String[] args) {
        StudySession first = new StudySession("Classes", 30);
        StudySession second = new StudySession("Exceptions", 45);
        first.printPlan();
        second.printPlan();
    }
}`,
    output: "Classes — 30 min\nExceptions — 45 min",
    walkthrough: [
      "A class is a reusable plan for creating study-session objects.",
      "Each object has its own topic and duration.",
      "OOP makes it possible to add more sessions without duplicating the whole workflow.",
    ],
  },
  3: {
    file: "studyplanner/fundamentals/DataTypesDemo.java",
    code: String.raw`public class DataTypesDemo {
    public static void main(String[] args) {
        int semester = 2;
        long minutesStudied = 315L;
        double quizScore = 87.5;
        char grade = 'B';
        boolean examSoon = true;
        String subject = "Java OOP";
        var dailyGoalMinutes = 60;
        final int MAX_SESSION_MINUTES = 120;

        System.out.println(subject + " · semester " + semester);
        System.out.println(minutesStudied + " minutes, score " + quizScore);
        System.out.println("Exam soon: " + examSoon + ", grade: " + grade);
        System.out.println("Goal: " + dailyGoalMinutes + ", max session: " + MAX_SESSION_MINUTES);
    }
}`,
    output: "Java OOP · semester 2\n315 minutes, score 87.5\nExam soon: true, grade: B\nGoal: 60, max session: 120",
    walkthrough: [
      "Choose a type that fits the value: int for a count, double for a decimal, and boolean for yes/no.",
      "String stores text; var asks Java to infer a local variable's type.",
      "final prevents the session limit from being reassigned.",
    ],
  },
  4: {
    file: "studyplanner/fundamentals/OperatorsDemo.java",
    code: String.raw`public class OperatorsDemo {
    public static void main(String[] args) {
        int completedTasks = 6;
        int totalTasks = 8;
        double progress = completedTasks * 100.0 / totalTasks;
        int minutesAvailable = 45;
        boolean deadlineNear = true;
        boolean shouldPrioritize = deadlineNear && minutesAvailable >= 30;
        int completedAfterSession = completedTasks + 1;

        System.out.println("Progress: " + progress + "%");
        System.out.println("Prioritize next task: " + shouldPrioritize);
        System.out.println("Tasks after session: " + completedAfterSession);
    }
}`,
    output: "Progress: 75.0%\nPrioritize next task: true\nTasks after session: 7",
    walkthrough: [
      "Arithmetic operators calculate the completion percentage.",
      "The >= operator compares available time; && combines two conditions.",
      "The + operator creates an updated count without changing the original value.",
    ],
  },
  5: {
    file: "studyplanner/fundamentals/DecisionMakingDemo.java",
    code: String.raw`public class DecisionMakingDemo {
    public static void main(String[] args) {
        int daysUntilExam = 3;
        String priority;

        if (daysUntilExam <= 3) {
            priority = "High";
        } else if (daysUntilExam <= 10) {
            priority = "Medium";
        } else {
            priority = "Low";
        }

        String activity;
        switch ("practice") {
            case "practice" -> activity = "Solve questions";
            case "review" -> activity = "Review notes";
            default -> activity = "Read the next topic";
        }

        System.out.println(priority + " priority: " + activity);
    }
}`,
    output: "High priority: Solve questions",
    walkthrough: [
      "if/else compares the exam date with priority thresholds.",
      "switch selects an activity from a known set of study modes.",
      "The chosen values can guide the next step in a study plan.",
    ],
  },
  6: {
    file: "studyplanner/fundamentals/LoopsDemo.java",
    code: String.raw`public class LoopsDemo {
    public static void main(String[] args) {
        String[] topics = {"Classes", "Methods", "Constructors"};
        for (String topic : topics) {
            System.out.println("Review: " + topic);
        }

        int tasksLeft = 2;
        while (tasksLeft > 0) {
            System.out.println("Task completed; left=" + (--tasksLeft));
        }

        int attempts = 0;
        do {
            attempts++;
        } while (attempts < 2);
        System.out.println("Slot search attempts: " + attempts);
    }
}`,
    output: "Review: Classes\nReview: Methods\nReview: Constructors\nTask completed; left=1\nTask completed; left=0\nSlot search attempts: 2",
    walkthrough: [
      "The for-each loop visits every topic in the array.",
      "while repeats as long as tasks remain.",
      "do-while always runs at least once, which is useful for a first search attempt.",
    ],
  },
  7: {
    file: "studyplanner/fundamentals/PracticeSession1.java",
    code: String.raw`public class PracticeSession1 {
    public static void main(String[] args) {
        String[] subjects = {"Java", "Math", "Writing"};
        int[] plannedHours = {4, 3, 2};
        int[] studiedHours = {3, 2, 2};
        int totalPlanned = 0;
        int totalStudied = 0;

        for (int i = 0; i < subjects.length; i++) {
            totalPlanned += plannedHours[i];
            totalStudied += studiedHours[i];
            System.out.println(subjects[i] + ": " + studiedHours[i] + "/" + plannedHours[i] + "h");
        }
        System.out.println("Weekly progress: " + totalStudied + "/" + totalPlanned + "h");
    }
}`,
    output: "Java: 3/4h\nMath: 2/3h\nWriting: 2/2h\nWeekly progress: 7/9h",
    walkthrough: [
      "Parallel arrays keep each subject aligned with its planned and completed hours.",
      "The loop calculates the totals while displaying each subject's progress.",
      "This small report combines variables, arrays, operators, and iteration.",
    ],
  },
  8: {
    file: "studyplanner/fundamentals/TypeConversionDemo.java",
    code: String.raw`import java.util.ArrayList;
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
}`,
    output: "Minutes: 45, hours: 0.75",
    walkthrough: [
      "Integer.parseInt converts text received from a form into an int.",
      "Collections store wrapper objects such as Integer, not primitive int values.",
      "Java boxes and unboxes automatically when values move into and out of the list.",
    ],
  },
  9: {
    file: "studyplanner/fundamentals/ArraysDemo.java",
    code: String.raw`import java.util.Arrays;

public class ArraysDemo {
    public static void main(String[] args) {
        int[] quizScores = {72, 84, 91};
        String[][] week = {
            {"Java", "Math"},
            {"Writing", "Java"},
            {"Review", "Rest"}
        };

        System.out.println("Scores: " + Arrays.toString(quizScores));
        System.out.println("Tuesday first block: " + week[1][0]);
        System.out.println("Days planned: " + week.length);
    }
}`,
    output: "Scores: [72, 84, 91]\nTuesday first block: Writing\nDays planned: 3",
    walkthrough: [
      "quizScores is a fixed-size, one-dimensional array.",
      "week is a two-dimensional array: each row represents a day and each column a block.",
      "Array indexes start at zero, so week[1][0] means Tuesday's first block.",
    ],
  },
  10: {
    file: "studyplanner/classes/StudyResource.java",
    code: String.raw`public class StudyResource {
    private final String title;
    private final String type;
    private boolean completed;

    public StudyResource(String title, String type) {
        this.title = title;
        this.type = type;
        this.completed = false;
    }

    public void markCompleted() {
        completed = true;
    }

    public String summary() {
        return title + " (" + type + ") — " + (completed ? "done" : "to review");
    }

    public static void main(String[] args) {
        StudyResource notes = new StudyResource("OOP notes", "PDF");
        notes.markCompleted();
        System.out.println(notes.summary());
    }
}`,
    output: "OOP notes (PDF) — done",
    walkthrough: [
      "StudyResource is the class: it defines the data and actions every resource has.",
      "notes is an object created from that class with its own title and type.",
      "markCompleted changes the object's state; summary describes the current object.",
    ],
  },
  11: {
    file: "studyplanner/classes/PracticeSession2.java",
    code: String.raw`public class PracticeSession2 {
    static class Resource {
        String title;
        int minutes;
        Resource(String title, int minutes) {
            this.title = title;
            this.minutes = minutes;
        }
    }

    public static void main(String[] args) {
        String csv = "OOP notes,20;Constructor video,35";
        String[] rows = csv.split(";");
        Resource[] resources = new Resource[rows.length];
        for (int i = 0; i < rows.length; i++) {
            String[] fields = rows[i].split(",");
            resources[i] = new Resource(fields[0], Integer.parseInt(fields[1]));
        }
        System.out.println(resources.length + " resources; first=" + resources[0].title);
    }
}`,
    output: "2 resources; first=OOP notes",
    walkthrough: [
      "split separates the CSV text into rows and then fields.",
      "Integer.parseInt converts the time value before object construction.",
      "The fixed-size Resource[] stores the parsed objects for later use.",
    ],
  },
  12: {
    file: "studyplanner/classes/ResourceLibrary.java",
    code: String.raw`import java.util.ArrayList;
import java.util.List;

public class ResourceLibrary {
    private final List<String> resources = new ArrayList<>();

    public void add(String title) { resources.add(title); }

    public String find(String query) {
        for (String title : resources) {
            if (title.toLowerCase().contains(query.toLowerCase())) return title;
        }
        return "Not found";
    }

    public int count() { return resources.size(); }

    public static void main(String[] args) {
        ResourceLibrary library = new ResourceLibrary();
        library.add("Java constructors guide");
        System.out.println(library.find("constructor") + " · " + library.count() + " item");
    }
}`,
    output: "Java constructors guide · 1 item",
    walkthrough: [
      "add, find, and count are named methods with one responsibility each.",
      "find receives an input, searches the list, and returns a result.",
      "The main method reuses the methods instead of repeating their logic.",
    ],
  },
  13: {
    file: "studyplanner/classes/StudySession.java",
    code: String.raw`public class StudySession {
    private String topic;
    private int minutes;

    public StudySession() { this("Untitled review", 25); }

    public StudySession(String topic, int minutes) {
        this.topic = topic;
        this.minutes = minutes;
    }

    public StudySession(StudySession other) {
        this(other.topic, other.minutes);
    }

    public String summary() { return topic + " · " + minutes + " min"; }

    public static void main(String[] args) {
        StudySession first = new StudySession("Inheritance", 40);
        StudySession copy = new StudySession(first);
        System.out.println(copy.summary());
    }
}`,
    output: "Inheritance · 40 min",
    walkthrough: [
      "The no-argument constructor supplies a useful default.",
      "The parameterized constructor sets a specific topic and duration.",
      "The copy constructor delegates with this(...) so initialization logic stays in one place.",
    ],
  },
  14: {
    file: "studyplanner/classes/ProgressCalculator.java",
    code: String.raw`public class ProgressCalculator {
    public double calculate(int completedTasks, int totalTasks) {
        return totalTasks == 0 ? 0 : completedTasks * 100.0 / totalTasks;
    }

    public double calculate(double completedHours, double goalHours) {
        return goalHours == 0 ? 0 : completedHours * 100.0 / goalHours;
    }

    public static void main(String[] args) {
        ProgressCalculator progress = new ProgressCalculator();
        System.out.println(progress.calculate(3, 4) + "% tasks");
        System.out.println(progress.calculate(2.5, 5.0) + "% hours");
    }
}`,
    output: "75.0% tasks\n50.0% hours",
    walkthrough: [
      "Both methods are named calculate, but their parameter types differ.",
      "The compiler selects the matching overload from the arguments.",
      "The zero check prevents division by zero for an empty goal.",
    ],
  },
  15: {
    file: "studyplanner/classes/ParameterPassingDemo.java",
    code: String.raw`public class ParameterPassingDemo {
    static class Task { String status = "Planned"; }

    static void update(int minutes, Task task, int[] weeklyHours) {
        minutes = 60;                 // changes only the local copy
        task.status = "Completed";   // changes the shared object
        weeklyHours[0] = 3;           // changes the shared array
    }

    public static void main(String[] args) {
        int minutes = 30;
        Task task = new Task();
        int[] hours = {1};
        update(minutes, task, hours);
        System.out.println(minutes + " / " + task.status + " / " + hours[0]);
    }
}`,
    output: "30 / Completed / 3",
    walkthrough: [
      "Java passes every argument by value, including object references.",
      "Reassigning the local primitive minutes does not change the caller's variable.",
      "The copied references still point to the same Task and array, so their contents can change.",
    ],
  },
  16: {
    file: "studyplanner/classes/PracticeSession3.java",
    code: String.raw`public class PracticeSession3 {
    static class PracticeBlock {
        String subject;
        int questions;
        PracticeBlock(String subject, int questions) {
            this.subject = subject;
            this.questions = questions;
        }
    }

    static PracticeBlock book(String subject) { return new PracticeBlock(subject, 5); }
    static PracticeBlock book(String subject, int questions) {
        return new PracticeBlock(subject, questions);
    }

    public static void main(String[] args) {
        System.out.println(book("Java").questions + " standard questions");
        System.out.println(book("Math", 12).questions + " custom questions");
    }
}`,
    output: "5 standard questions\n12 custom questions",
    walkthrough: [
      "PracticeBlock's constructor initializes each booked block.",
      "book(String) chooses a default number of questions.",
      "The overloaded book(String, int) lets the caller choose a different amount.",
    ],
  },
  17: {
    file: "studyplanner/classes/ReturningObjectsDemo.java",
    code: String.raw`public class ReturningObjectsDemo {
    static class Topic {
        String name;
        Topic left;
        Topic right;
        Topic(String name) { this.name = name; }
    }

    static Topic reschedule(Topic oldTopic, String newName) {
        return new Topic(newName); // return a new object
    }

    static int countTopics(Topic topic) {
        if (topic == null) return 0; // base case
        return 1 + countTopics(topic.left) + countTopics(topic.right);
    }

    public static void main(String[] args) {
        Topic java = new Topic("Java");
        java.left = new Topic("Classes");
        System.out.println(reschedule(java, "Java review").name);
        System.out.println("Topics: " + countTopics(java));
    }
}`,
    output: "Java review\nTopics: 2",
    walkthrough: [
      "reschedule constructs and returns a new Topic object.",
      "countTopics solves the tree by counting this node plus its child trees.",
      "The null check is the recursion base case that stops the calls.",
    ],
  },
  18: {
    file: "studyplanner/classes/external/AccessControlDemo.java",
    code: String.raw`class StudyProgress {
    private int quizScore = 86;       // only this class can read it directly
    protected String feedback = "Keep practising";
    String weeklyGoal = "5 hours";    // package-private
    public String studentName = "Ava Patel";

    public int getQuizScore() { return quizScore; }
}

public class AccessControlDemo {
    public static void main(String[] args) {
        StudyProgress progress = new StudyProgress();
        System.out.println(progress.studentName + " · " + progress.getQuizScore());
        // progress.quizScore is private, so this would not compile.
    }
}`,
    output: "Ava Patel · 86",
    walkthrough: [
      "private protects quizScore from direct outside changes.",
      "The public getter exposes the score through a controlled method.",
      "protected and package-private members have narrower sharing rules than public members.",
    ],
  },
  19: {
    file: "studyplanner/classes/FinalAndGcDemo.java",
    code: String.raw`public class FinalAndGcDemo {
    static class StudyPlan {
        final String studentId;
        StudyPlan(String studentId) { this.studentId = studentId; }
    }

    public static void main(String[] args) {
        final int MAX_DAILY_MINUTES = 240;
        StudyPlan draft = new StudyPlan("S104");
        System.out.println(draft.studentId + " · " + MAX_DAILY_MINUTES + " min limit");

        draft = null; // the draft may now be eligible for garbage collection
        System.out.println("Draft reference cleared; collection timing is JVM-managed");
    }
}`,
    output: "S104 · 240 min limit\nDraft reference cleared; collection timing is JVM-managed",
    walkthrough: [
      "final prevents the daily limit from being reassigned.",
      "A final field can be set by the constructor and then remains fixed.",
      "Clearing the last reference makes an object eligible for collection; System.gc() is only a request, not a guarantee.",
    ],
  },
  20: {
    file: "studyplanner/classes/PracticeSession4.java",
    code: String.raw`public class PracticeSession4 {
    static class ProgressAccount {
        private int completedMinutes;
        private final int weeklyGoal = 300;

        void addStudy(int minutes) { completedMinutes += minutes; }
        int minutesRemaining() { return Math.max(0, weeklyGoal - completedMinutes); }
        int totalForDays(int minutesPerDay, int days) {
            if (days == 0) return 0;
            return minutesPerDay + totalForDays(minutesPerDay, days - 1);
        }
    }

    public static void main(String[] args) {
        ProgressAccount account = new ProgressAccount();
        account.addStudy(120);
        System.out.println("Goal remaining: " + account.minutesRemaining());
        System.out.println("Three-day plan: " + account.totalForDays(40, 3));
    }
}`,
    output: "Goal remaining: 180\nThree-day plan: 120",
    walkthrough: [
      "The account's progress is private and can only be changed through addStudy().",
      "The weekly target is final, so it cannot accidentally change mid-plan.",
      "totalForDays recursively adds one day's minutes until the base case reaches zero days.",
    ],
  },
  21: {
    file: "studyplanner/classes/StudyPlanner.java",
    code: String.raw`public class StudyPlanner {
    static class Settings { int dailyGoalMinutes = 90; } // nested class

    interface StudyRule { boolean met(int minutes); }

    class DayPlan { // inner class belongs to a planner object
        String label = "Monday";
        String summary() { return label + " · " + settings.dailyGoalMinutes + " min goal"; }
    }

    private final Settings settings = new Settings();

    String reviewDay() {
        class GoalCheck { boolean met(int minutes) { return minutes >= settings.dailyGoalMinutes; } }
        GoalCheck check = new GoalCheck();
        StudyRule rule = new StudyRule() { // anonymous class for a one-off rule
            public boolean met(int minutes) { return minutes <= 120; }
        };
        return check.met(90) && rule.met(90) ? "Goal met" : "Adjust the plan";
    }

    public static void main(String[] args) {
        StudyPlanner planner = new StudyPlanner();
        System.out.println(planner.new DayPlan().summary());
        System.out.println(planner.reviewDay());
    }
}`,
    output: "Monday · 90 min goal\nGoal met",
    walkthrough: [
      "Settings is static nested: it does not need a StudyPlanner instance.",
      "DayPlan is an inner class and can read its enclosing planner's settings.",
      "GoalCheck is local to one method and exists only while reviewDay() runs.",
    ],
  },
  22: {
    file: "studyplanner/inheritance/InheritanceBasicsDemo.java",
    code: String.raw`class Person {
    private final String name;
    Person(String name) { this.name = name; }
    String getName() { return name; }
}

class Student extends Person {
    private final String course;
    Student(String name, String course) {
        super(name);
        this.course = course;
    }
    String profile() { return getName() + " studies " + course; }
}

public class InheritanceBasicsDemo {
    public static void main(String[] args) {
        System.out.println(new Student("Ava Patel", "Java OOP").profile());
    }
}`,
    output: "Ava Patel studies Java OOP",
    walkthrough: [
      "Person holds identity that can be reused by different kinds of people.",
      "Student extends Person, so it inherits getName() and adds course-specific data.",
      "The relationship is IS-A: a Student is a Person.",
    ],
  },
  23: {
    file: "studyplanner/inheritance/access/InheritanceAccessDemo.java",
    code: String.raw`class PersonRecord {
    private final String id;
    protected final String displayName;
    PersonRecord(String id, String displayName) {
        this.id = id;
        this.displayName = displayName;
    }
    public String getId() { return id; }
}

class StudentRecord extends PersonRecord {
    StudentRecord(String id, String name) { super(id, name); }
    String welcome() { return "Welcome, " + displayName; } // protected is inherited
}

public class InheritanceAccessDemo {
    public static void main(String[] args) {
        StudentRecord student = new StudentRecord("S104", "Ava Patel");
        System.out.println(student.welcome() + " · " + student.getId());
        // student.id is private and cannot be accessed here.
    }
}`,
    output: "Welcome, Ava Patel · S104",
    walkthrough: [
      "A subclass can use the protected displayName field.",
      "The private id remains hidden, including from the subclass.",
      "The public getter provides controlled access to the identifier.",
    ],
  },
  24: {
    file: "studyplanner/inheritance/SuperKeywordDemo.java",
    code: String.raw`class Person {
    private final String name;
    Person(String name) { this.name = name; }
    String describe() { return "Person: " + name; }
}

class Mentor extends Person {
    private final String subject;
    Mentor(String name, String subject) {
        super(name); // initialize the Person part first
        this.subject = subject;
    }
    String describeMentor() {
        return super.describe() + " · mentors " + subject;
    }
}

public class SuperKeywordDemo {
    public static void main(String[] args) {
        System.out.println(new Mentor("Dr. Rivera", "Java").describeMentor());
    }
}`,
    output: "Person: Dr. Rivera · mentors Java",
    walkthrough: [
      "super(name) calls the parent constructor to initialize inherited state.",
      "super.describe() calls the parent implementation explicitly.",
      "Mentor adds its own subject detail to the shared description.",
    ],
  },
  25: {
    file: "studyplanner/inheritance/PracticeSession5.java",
    code: String.raw`class LearningMaterial {
    private final String title;
    LearningMaterial(String title) { this.title = title; }
    String title() { return title; }
    String open() { return "Opening " + title; }
}

class VideoLesson extends LearningMaterial {
    VideoLesson(String title) { super(title); }
    String open() { return super.open() + " in the video player"; }
}

public class PracticeSession5 {
    public static void main(String[] args) {
        System.out.println(new VideoLesson("Constructors").open());
    }
}`,
    output: "Opening Constructors in the video player",
    walkthrough: [
      "LearningMaterial stores behavior shared by different resources.",
      "VideoLesson extends the base class and reuses its constructor and open() method.",
      "The subclass specializes the shared behavior for a video resource.",
    ],
  },
  26: {
    file: "studyplanner/inheritance/MultilevelInheritanceDemo.java",
    code: String.raw`class Person {
    String name;
    Person(String name) { this.name = name; }
}
class StudyMember extends Person {
    StudyMember(String name) { super(name); }
    String role() { return "study member"; }
}
class Mentor extends StudyMember {
    Mentor(String name) { super(name); }
    String role() { return "mentor"; }
}
class AdvancedMentor extends Mentor {
    AdvancedMentor(String name) { super(name); }
    String focus() { return "exam strategy"; }
}

public class MultilevelInheritanceDemo {
    public static void main(String[] args) {
        AdvancedMentor mentor = new AdvancedMentor("Dr. Rivera");
        System.out.println(mentor.name + " · " + mentor.role() + " · " + mentor.focus());
    }
}`,
    output: "Dr. Rivera · mentor · exam strategy",
    walkthrough: [
      "AdvancedMentor inherits from Mentor, which inherits from StudyMember, which inherits from Person.",
      "Each level adds or specializes behavior while reusing the parent state.",
      "Constructor calls move upward through the hierarchy using super(...).",
    ],
  },
  27: {
    file: "studyplanner/inheritance/MethodOverridingDemo.java",
    code: String.raw`class StudyMember {
    String weeklyPlan() { return "Review your subjects"; }
}

class Student extends StudyMember {
    @Override
    String weeklyPlan() { return "Complete two practice sets"; }
}

class Tutor extends StudyMember {
    @Override
    String weeklyPlan() { return "Prepare a guided review"; }
}

public class MethodOverridingDemo {
    public static void main(String[] args) {
        System.out.println(new Student().weeklyPlan());
        System.out.println(new Tutor().weeklyPlan());
    }
}`,
    output: "Complete two practice sets\nPrepare a guided review",
    walkthrough: [
      "Both subclasses use the same weeklyPlan() signature as the parent.",
      "@Override asks the compiler to verify that an inherited method is being replaced.",
      "Each role supplies behavior that makes sense for its own type.",
    ],
  },
  28: {
    file: "studyplanner/inheritance/PolymorphismDemo.java",
    code: String.raw`import java.util.List;

class StudyMember {
    String weeklyPlan() { return "General review"; }
}
class Student extends StudyMember {
    @Override String weeklyPlan() { return "Solve practice questions"; }
}
class Tutor extends StudyMember {
    @Override String weeklyPlan() { return "Prepare a lesson"; }
}

public class PolymorphismDemo {
    public static void main(String[] args) {
        List<StudyMember> members = List.of(new Student(), new Tutor());
        for (StudyMember member : members) {
            System.out.println(member.weeklyPlan());
        }
    }
}`,
    output: "Solve practice questions\nPrepare a lesson",
    walkthrough: [
      "The list stores different concrete objects using one shared parent type.",
      "Java chooses weeklyPlan() from each object's real class at runtime.",
      "This lets one loop work with many study-member types without checking each one manually.",
    ],
  },
  29: {
    file: "studyplanner/inheritance/PracticeSession6.java",
    code: String.raw`interface ReminderChannel {
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
}`,
    output: "Email: Java review starts at 4 PM\nCalendar: Java review starts at 4 PM",
    walkthrough: [
      "ReminderChannel defines one shared capability: send a message.",
      "EmailReminder and CalendarReminder implement that contract differently.",
      "remind() depends on the interface, so either implementation can be passed in.",
    ],
  },
  30: {
    file: "studyplanner/inheritance/AbstractAndInterfaceDemo.java",
    code: String.raw`interface Trackable {
    int completedTopics();
}

abstract class StudyMember {
    private final String name;
    StudyMember(String name) { this.name = name; }
    String name() { return name; }
    abstract String nextStep();
}

class Student extends StudyMember implements Trackable {
    Student(String name) { super(name); }
    String nextStep() { return "Review constructors"; }
    public int completedTopics() { return 8; }
}

public class AbstractAndInterfaceDemo {
    public static void main(String[] args) {
        Student student = new Student("Ava Patel");
        System.out.println(student.name() + ": " + student.nextStep());
        System.out.println("Completed: " + student.completedTopics());
    }
}`,
    output: "Ava Patel: Review constructors\nCompleted: 8",
    walkthrough: [
      "An abstract class can store shared state while requiring subclasses to implement nextStep().",
      "Trackable is an interface describing a capability rather than a shared parent state.",
      "Student extends one class and implements the interface at the same time.",
    ],
  },
  31: {
    file: "studyplanner/inheritance/CompositionVsInheritanceDemo.java",
    code: String.raw`import java.util.ArrayList;
import java.util.List;

class Mentor {
    String name;
    Mentor(String name) { this.name = name; }
}
class AdvancedMentor extends Mentor { // IS-A
    AdvancedMentor(String name) { super(name); }
}
class Subject { // HAS-A
    private final List<String> topics = new ArrayList<>();
    void addTopic(String topic) { topics.add(topic); }
    int topicCount() { return topics.size(); }
}

public class CompositionVsInheritanceDemo {
    public static void main(String[] args) {
        AdvancedMentor mentor = new AdvancedMentor("Dr. Rivera");
        Subject java = new Subject();
        java.addTopic("Classes");
        System.out.println(mentor.name + " · " + java.topicCount() + " topic");
    }
}`,
    output: "Dr. Rivera · 1 topic",
    walkthrough: [
      "AdvancedMentor IS-A Mentor, so inheritance expresses a specialized kind of mentor.",
      "Subject HAS-A list of topics, so it keeps those objects as fields.",
      "Composition is useful when one object owns or uses another without being that type.",
    ],
  },
  32: {
    file: "studyplanner/io/ConsoleInputDemo.java",
    code: String.raw`import java.io.BufferedReader;
import java.io.StringReader;
import java.util.Scanner;

public class ConsoleInputDemo {
    public static void main(String[] args) throws Exception {
        // Preset text keeps the demo repeatable; use System.in for keyboard input.
        Scanner scanner = new Scanner("Ava Patel 60");
        String name = scanner.next() + " " + scanner.next();
        int dailyGoal = scanner.nextInt();

        BufferedReader reader = new BufferedReader(new StringReader("Java OOP"));
        String subject = reader.readLine();
        System.out.println(name + " plans " + dailyGoal + " minutes for " + subject);
        scanner.close();
        reader.close();
    }
}`,
    output: "Ava Patel plans 60 minutes for Java OOP",
    walkthrough: [
      "Scanner makes it convenient to parse tokens and numbers from input.",
      "BufferedReader reads a full line of text efficiently.",
      "Preset input makes the example finish automatically; replace it with System.in for an interactive version.",
    ],
  },
  33: {
    file: "studyplanner/io/FileHandlingBasics.java",
    code: String.raw`import java.io.FileReader;
import java.io.FileWriter;
import java.nio.file.Files;
import java.nio.file.Path;

public class FileHandlingBasics {
    public static void main(String[] args) throws Exception {
        Path log = Files.createTempFile("study-log", ".txt");
        try (FileWriter writer = new FileWriter(log.toFile())) {
            writer.write("09:00 — Reviewed arrays\n");
        }
        try (FileWriter append = new FileWriter(log.toFile(), true)) {
            append.write("09:30 — Completed quiz\n");
        }
        try (FileReader reader = new FileReader(log.toFile())) {
            int character;
            while ((character = reader.read()) != -1) System.out.print((char) character);
        }
        Files.deleteIfExists(log);
    }
}`,
    output: "09:00 — Reviewed arrays\n09:30 — Completed quiz",
    walkthrough: [
      "FileWriter writes characters to a text file; the second writer appends.",
      "FileReader reads one character at a time until it reaches -1 (end of file).",
      "try-with-resources closes each reader or writer automatically.",
    ],
  },
  34: {
    file: "studyplanner/io/PracticeSession7.java",
    code: String.raw`abstract class ProgressWriter {
    abstract String format(String subject, int minutes);
    void print(String subject, int minutes) {
        System.out.println(format(subject, minutes));
    }
}
class CsvWriter extends ProgressWriter {
    String format(String subject, int minutes) { return subject + "," + minutes; }
}
class TextWriter extends ProgressWriter {
    String format(String subject, int minutes) { return subject + ": " + minutes + " minutes"; }
}

public class PracticeSession7 {
    public static void main(String[] args) {
        ProgressWriter csv = new CsvWriter();
        ProgressWriter text = new TextWriter();
        csv.print("Java", 45);
        text.print("Java", 45);
    }
}`,
    output: "Java,45\nJava: 45 minutes",
    walkthrough: [
      "ProgressWriter defines a shared report workflow and an abstract formatting step.",
      "CsvWriter and TextWriter each supply their own format implementation.",
      "The caller uses the same print() method for either output style.",
    ],
  },
  35: {
    file: "studyplanner/io/ByteStreamsDemo.java",
    code: String.raw`import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;

public class ByteStreamsDemo {
    public static void main(String[] args) throws Exception {
        Path source = Files.createTempFile("resource", ".bin");
        Path copy = Files.createTempFile("resource-copy", ".bin");
        try (FileOutputStream out = new FileOutputStream(source.toFile())) {
            out.write(new byte[] {74, 65, 86, 65});
        }
        try (FileInputStream in = new FileInputStream(source.toFile());
             FileOutputStream out = new FileOutputStream(copy.toFile())) {
            in.transferTo(out);
        }
        System.out.println("Copied " + Files.size(copy) + " bytes");
        Files.deleteIfExists(source);
        Files.deleteIfExists(copy);
    }
}`,
    output: "Copied 4 bytes",
    walkthrough: [
      "FileOutputStream writes raw bytes rather than human-readable characters.",
      "FileInputStream reads the binary resource and transferTo copies it to another stream.",
      "Byte streams suit downloads and binary files; use character streams for text.",
    ],
  },
  36: {
    file: "studyplanner/exceptions/ExceptionIntroDemo.java",
    code: String.raw`import java.io.FileReader;
import java.io.IOException;

public class ExceptionIntroDemo {
    public static void main(String[] args) {
        try {
            new FileReader("missing-study-notes.txt"); // checked exception
        } catch (IOException error) {
            System.out.println("Notes file is unavailable");
        }

        try {
            int minutes = Integer.parseInt("forty"); // unchecked exception
            System.out.println(minutes);
        } catch (NumberFormatException error) {
            System.out.println("Enter study time as a number");
        }
    }
}`,
    output: "Notes file is unavailable\nEnter study time as a number",
    walkthrough: [
      "IOException is checked: Java requires the code to catch it or declare it.",
      "NumberFormatException is unchecked and happens when text is not a valid number.",
      "Handling known failures lets the planner explain what the user can fix.",
    ],
  },
  37: {
    file: "studyplanner/exceptions/TryCatchFinallyDemo.java",
    code: String.raw`import java.io.BufferedReader;
import java.io.StringReader;

public class TryCatchFinallyDemo {
    public static void main(String[] args) {
        BufferedReader reader = new BufferedReader(new StringReader("Java review"));
        try {
            System.out.println(reader.readLine());
        } catch (java.io.IOException error) {
            System.out.println("Could not read the study note");
        } finally {
            try { reader.close(); } catch (java.io.IOException ignored) { }
            System.out.println("Reader closed");
        }

        try (BufferedReader safe = new BufferedReader(new StringReader("Task list"))) {
            System.out.println(safe.readLine());
        } catch (java.io.IOException error) {
            System.out.println("Could not read tasks");
        }
    }
}`,
    output: "Java review\nReader closed\nTask list",
    walkthrough: [
      "try holds operations that may fail; catch handles the IOException.",
      "finally runs whether the read succeeds or fails, so it can clean up resources.",
      "Try-with-resources closes the second reader automatically when the block ends.",
    ],
  },
  38: {
    file: "studyplanner/exceptions/ThrowThrowsDemo.java",
    code: String.raw`class InvalidStudySessionException extends Exception {
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
}`,
    output: "Session must be 15–240 minutes",
    walkthrough: [
      "The custom checked exception names a study-planner rule failure.",
      "throw creates and raises the exception when the duration is invalid.",
      "throws documents that validate may pass this exception to its caller.",
    ],
  },
  39: {
    file: "studyplanner/exceptions/PracticeSession8.java",
    code: String.raw`import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class PracticeSession8 {
    public static void main(String[] args) throws IOException {
        String csv = "Java,45\nMath,30\nInvalid row\nWriting,20";
        Path file = Files.createTempFile("study-tasks", ".csv");
        Files.writeString(file, csv); // save sample data
        List<String> tasks = new ArrayList<>();

        for (String line : Files.readAllLines(file)) { // load rows
            String[] fields = line.split(",");
            if (fields.length != 2) {
                System.out.println("Skipped malformed row: " + line);
                continue;
            }
            try {
                tasks.add(fields[0] + " · " + Integer.parseInt(fields[1]) + " min");
            } catch (NumberFormatException error) {
                System.out.println("Skipped invalid duration: " + line);
            }
        }
        System.out.println("Loaded " + tasks.size() + " study blocks");
        Files.deleteIfExists(file);
    }
}`,
    output: "Skipped malformed row: Invalid row\nLoaded 3 study blocks",
    walkthrough: [
      "Each line is parsed independently so one bad row does not stop the whole import.",
      "A shape check catches missing CSV fields; NumberFormatException catches invalid minutes.",
      "The final list contains only records that passed validation.",
    ],
  },
  40: {
    file: "studyplanner/threads/MultithreadingIntro.java",
    code: String.raw`public class MultithreadingIntro {
    static void task(String name) {
        System.out.println(name + " on " + Thread.currentThread().getName());
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("Sequential:");
        task("Build flashcards");
        task("Calculate progress");

        System.out.println("Concurrent:");
        Thread cards = new Thread(() -> task("Build flashcards"));
        Thread progress = new Thread(() -> task("Calculate progress"));
        cards.start();
        progress.start();
        cards.join();
        progress.join();
    }
}`,
    output: "Sequential:\nBuild flashcards on main\nCalculate progress on main\nConcurrent:\nTasks run on separate threads; their order may vary",
    walkthrough: [
      "The first two calls run one after another on the main thread.",
      "start() asks the JVM to run each task concurrently on another thread.",
      "join() waits for both tasks; concurrent print order is not guaranteed.",
    ],
  },
  41: {
    file: "studyplanner/threads/ThreadCreationDemo.java",
    code: String.raw`public class ThreadCreationDemo {
    static class FlashcardBuilder extends Thread {
        public void run() { System.out.println("Flashcards prepared"); }
    }

    public static void main(String[] args) throws InterruptedException {
        Thread fromClass = new FlashcardBuilder();
        Thread fromRunnable = new Thread(new Runnable() {
            public void run() { System.out.println("Progress calculated"); }
        });
        Thread fromLambda = new Thread(() -> System.out.println("Reminder queued"));

        fromClass.start();
        fromRunnable.start();
        fromLambda.start();
        fromClass.join();
        fromRunnable.join();
        fromLambda.join();
    }
}`,
    output: "Flashcards prepared\nProgress calculated\nReminder queued\n(Order may vary)",
    walkthrough: [
      "A Thread subclass puts the task in run().",
      "Runnable separates the task from the thread that runs it.",
      "A lambda is a short form of Runnable when there is one abstract method.",
    ],
  },
  42: {
    file: "studyplanner/threads/ThreadLifecycleDemo.java",
    code: String.raw`public class ThreadLifecycleDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread timer = new Thread(() -> {
            System.out.println("Timer task is running");
        });

        System.out.println("Before start: " + timer.getState());
        timer.start();                 // creates a new thread
        timer.join();
        System.out.println("After join: " + timer.getState());

        Thread directCall = new Thread(() -> System.out.println("Called by main"));
        directCall.run();              // ordinary method call; no new thread
        System.out.println("Direct-call state: " + directCall.getState());
    }
}`,
    output: "Before start: NEW\nTimer task is running\nAfter join: TERMINATED\nCalled by main\nDirect-call state: NEW",
    walkthrough: [
      "A new Thread begins in NEW state.",
      "start() creates a separate execution path; join() waits until it terminates.",
      "Calling run() directly does not start a thread—it executes on the current thread.",
    ],
  },
  43: {
    file: "studyplanner/threads/ThreadPriorityJoinDemo.java",
    code: String.raw`public class ThreadPriorityJoinDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread practice = new Thread(() -> System.out.println("Practice set finished"));
        Thread report = new Thread(() -> System.out.println("Progress report ready"));

        practice.setPriority(Thread.MAX_PRIORITY); // only a scheduling hint
        report.setPriority(Thread.MIN_PRIORITY);
        practice.start();
        practice.join(); // report waits for practice to finish
        report.start();
        report.join();
    }
}`,
    output: "Practice set finished\nProgress report ready",
    walkthrough: [
      "Thread priorities are hints to the scheduler, not guarantees about order.",
      "join() blocks the calling thread until the target thread completes.",
      "The report starts only after the practice task has finished.",
    ],
  },
  44: {
    file: "studyplanner/threads/PracticeSession9.java",
    code: String.raw`public class PracticeSession9 {
    static Thread task(String label) {
        return new Thread(() -> System.out.println(label + " complete"));
    }

    public static void main(String[] args) throws InterruptedException {
        Thread revision = task("Revision");
        Thread quiz = task("Quiz generation");
        Thread reminder = task("Reminder setup");

        revision.start();
        quiz.start();
        reminder.start();
        revision.join();
        quiz.join();
        reminder.join();
        System.out.println("Weekly plan can now be summarized");
    }
}`,
    output: "Revision complete\nQuiz generation complete\nReminder setup complete\nWeekly plan can now be summarized",
    walkthrough: [
      "Each independent activity is represented as a Thread.",
      "All work starts before the program waits, so tasks can overlap.",
      "The summary is printed only after join() confirms every task is done.",
    ],
  },
  45: {
    file: "studyplanner/threads/SynchronizationDemo.java",
    code: String.raw`class StudySlotAllocator {
    private boolean available = true;

    synchronized boolean reserve(String student) {
        if (!available) return false;
        available = false;
        System.out.println(student + " reserved the 4 PM slot");
        return true;
    }
}

public class SynchronizationDemo {
    public static void main(String[] args) throws InterruptedException {
        StudySlotAllocator allocator = new StudySlotAllocator();
        Thread first = new Thread(() -> allocator.reserve("Ava"));
        Thread second = new Thread(() -> allocator.reserve("Noah"));
        first.start();
        second.start();
        first.join();
        second.join();
    }
}`,
    output: "Exactly one student reserves the 4 PM slot; the other finds it unavailable.",
    walkthrough: [
      "Both threads share one allocator object and compete for one slot.",
      "synchronized allows only one thread at a time inside reserve().",
      "The availability check and update happen together, preventing two winners.",
    ],
  },
  46: {
    file: "studyplanner/threads/InterThreadCommunicationDemo.java",
    code: String.raw`import java.util.LinkedList;
import java.util.Queue;

class StudyTaskQueue {
    private final Queue<String> tasks = new LinkedList<>();

    synchronized void add(String task) {
        tasks.add(task);
        notifyAll();
    }

    synchronized String take() throws InterruptedException {
        while (tasks.isEmpty()) wait();
        return tasks.remove();
    }
}

public class InterThreadCommunicationDemo {
    public static void main(String[] args) throws InterruptedException {
        StudyTaskQueue queue = new StudyTaskQueue();
        Thread planner = new Thread(() -> {
            try { System.out.println("Next: " + queue.take()); }
            catch (InterruptedException error) { Thread.currentThread().interrupt(); }
        });
        planner.start();
        queue.add("Review constructors");
        planner.join();
    }
}`,
    output: "Next: Review constructors",
    walkthrough: [
      "The consumer calls wait() when the queue is empty; wait releases the object's monitor.",
      "The producer adds a task and calls notifyAll() while synchronized on the same queue.",
      "The consumer wakes, checks the condition again in a while loop, then removes the task.",
    ],
  },
  47: {
    file: "studyplanner/threads/ThreadControlDemo.java",
    code: String.raw`class FocusTimer implements Runnable {
    private boolean paused;
    private boolean stopped;

    synchronized void pauseTimer() {
        paused = true;
        System.out.println("Pause requested");
    }
    synchronized void resumeTimer() {
        paused = false;
        notifyAll();
        System.out.println("Resume requested");
    }
    synchronized void stopTimer() {
        stopped = true;
        notifyAll();
        System.out.println("Stop requested");
    }

    public void run() {
        try {
            while (true) {
                synchronized (this) {
                    while (paused && !stopped) wait();
                    if (stopped) break;
                }
                Thread.sleep(10);
            }
        } catch (InterruptedException error) {
            Thread.currentThread().interrupt();
        }
    }
}

public class ThreadControlDemo {
    public static void main(String[] args) throws InterruptedException {
        FocusTimer timer = new FocusTimer();
        Thread worker = new Thread(timer);
        worker.start();
        timer.pauseTimer();
        timer.resumeTimer();
        timer.stopTimer();
        worker.join();
        System.out.println("Timer stopped safely");
    }
}`,
    output: "Pause requested\nResume requested\nStop requested\nTimer stopped safely",
    walkthrough: [
      "The timer checks pause and stop flags cooperatively instead of using unsafe stop/suspend methods.",
      "wait() pauses while paused; resumeTimer() changes the flag and notifies the worker.",
      "stopTimer() signals the loop to finish, and join() waits for a clean shutdown.",
    ],
  },
  48: {
    file: "studyplanner/threads/PracticeSession10.java",
    code: String.raw`class FocusSlots {
    private int available = 1;

    synchronized void reserve(String student) throws InterruptedException {
        while (available == 0) wait();
        available--;
        System.out.println(student + " started a focus session");
    }

    synchronized void finish(String student) {
        System.out.println(student + " finished and released the slot");
        available++;
        notifyAll();
    }
}

public class PracticeSession10 {
    public static void main(String[] args) throws InterruptedException {
        FocusSlots slots = new FocusSlots();
        Runnable session = () -> {
            String student = Thread.currentThread().getName();
            try {
                slots.reserve(student);
                Thread.sleep(20);
                slots.finish(student);
            } catch (InterruptedException error) {
                Thread.currentThread().interrupt();
            }
        };
        Thread first = new Thread(session, "Ava");
        Thread second = new Thread(session, "Noah");
        first.start();
        second.start();
        first.join();
        second.join();
        System.out.println("Both planned sessions finished");
    }
}`,
    output: "One student reserves the slot; the other waits. Releasing it wakes the next student.",
    walkthrough: [
      "The synchronized methods protect the shared count of available focus slots.",
      "A waiting thread calls wait() when there is no slot; finish() releases one and notifies waiters.",
      "The while loop checks the condition again after waking, so only one student uses the slot at once.",
    ],
  },
};
