export type LessonExample = {
  file: string;
  output: string;
  walkthrough: string[];
};

// Console output is illustrative; source code lives in public/java/studyplanner/lessons.
export const lessonExamples: Record<number, LessonExample> = {
  1: {
    file: "studyplanner/lessons/lecture01/OopIntroDemo.java",
    output: "Study Arrays for 25 minutes\nStudy Arrays for 25 minutes",
    walkthrough: [
      "The procedural method receives separate values and prints them.",
      "StudySession stores the same values in fields and provides start().",
      "Both approaches work; objects keep related study data and behavior together.",
    ],
  },
  2: {
    file: "studyplanner/lessons/lecture02/OopIntroDemo.java",
    output: "Classes — 30 min\nExceptions — 45 min",
    walkthrough: [
      "A class is a reusable plan for creating study-session objects.",
      "Each object has its own topic and duration.",
      "OOP makes it possible to add more sessions without duplicating the whole workflow.",
    ],
  },
  3: {
    file: "studyplanner/lessons/lecture03/DataTypesDemo.java",
    output: "Java OOP · semester 2\n315 minutes, score 87.5\nExam soon: true, grade: B\nGoal: 60, max session: 120",
    walkthrough: [
      "Choose a type that fits the value: int for a count, double for a decimal, and boolean for yes/no.",
      "String stores text; var asks Java to infer a local variable's type.",
      "final prevents the session limit from being reassigned.",
    ],
  },
  4: {
    file: "studyplanner/lessons/lecture04/OperatorsDemo.java",
    output: "Progress: 75.0%\nPrioritize next task: true\nTasks after session: 7",
    walkthrough: [
      "Arithmetic operators calculate the completion percentage.",
      "The >= operator compares available time; && combines two conditions.",
      "The + operator creates an updated count without changing the original value.",
    ],
  },
  5: {
    file: "studyplanner/lessons/lecture05/DecisionMakingDemo.java",
    output: "High priority: Solve questions",
    walkthrough: [
      "if/else compares the exam date with priority thresholds.",
      "switch selects an activity from a known set of study modes.",
      "The chosen values can guide the next step in a study plan.",
    ],
  },
  6: {
    file: "studyplanner/lessons/lecture06/LoopsDemo.java",
    output: "Review: Classes\nReview: Methods\nReview: Constructors\nTask completed; left=1\nTask completed; left=0\nSlot search attempts: 2",
    walkthrough: [
      "The for-each loop visits every topic in the array.",
      "while repeats as long as tasks remain.",
      "do-while always runs at least once, which is useful for a first search attempt.",
    ],
  },
  7: {
    file: "studyplanner/lessons/lecture07/PracticeSession1.java",
    output: "Java: 3/4h\nMath: 2/3h\nWriting: 2/2h\nWeekly progress: 7/9h",
    walkthrough: [
      "Parallel arrays keep each subject aligned with its planned and completed hours.",
      "The loop calculates the totals while displaying each subject's progress.",
      "This small report combines variables, arrays, operators, and iteration.",
    ],
  },
  8: {
    file: "studyplanner/lessons/lecture08/TypeConversionDemo.java",
    output: "Minutes: 45, hours: 0.75",
    walkthrough: [
      "Integer.parseInt converts text received from a form into an int.",
      "Collections store wrapper objects such as Integer, not primitive int values.",
      "Java boxes and unboxes automatically when values move into and out of the list.",
    ],
  },
  9: {
    file: "studyplanner/lessons/lecture09/ArraysDemo.java",
    output: "Scores: [72, 84, 91]\nTuesday first block: Writing\nDays planned: 3",
    walkthrough: [
      "quizScores is a fixed-size, one-dimensional array.",
      "week is a two-dimensional array: each row represents a day and each column a block.",
      "Array indexes start at zero, so week[1][0] means Tuesday's first block.",
    ],
  },
  10: {
    file: "studyplanner/lessons/lecture10/StudyResource.java",
    output: "OOP notes (PDF) — done",
    walkthrough: [
      "StudyResource is the class: it defines the data and actions every resource has.",
      "notes is an object created from that class with its own title and type.",
      "markCompleted changes the object's state; summary describes the current object.",
    ],
  },
  11: {
    file: "studyplanner/lessons/lecture11/PracticeSession2.java",
    output: "2 resources; first=OOP notes",
    walkthrough: [
      "split separates the CSV text into rows and then fields.",
      "Integer.parseInt converts the time value before object construction.",
      "The fixed-size Resource[] stores the parsed objects for later use.",
    ],
  },
  12: {
    file: "studyplanner/lessons/lecture12/ResourceLibrary.java",
    output: "Java constructors guide · 1 item",
    walkthrough: [
      "add, find, and count are named methods with one responsibility each.",
      "find receives an input, searches the list, and returns a result.",
      "The main method reuses the methods instead of repeating their logic.",
    ],
  },
  13: {
    file: "studyplanner/lessons/lecture13/StudySession.java",
    output: "Inheritance · 40 min",
    walkthrough: [
      "The no-argument constructor supplies a useful default.",
      "The parameterized constructor sets a specific topic and duration.",
      "The copy constructor delegates with this(...) so initialization logic stays in one place.",
    ],
  },
  14: {
    file: "studyplanner/lessons/lecture14/ProgressCalculator.java",
    output: "75.0% tasks\n50.0% hours",
    walkthrough: [
      "Both methods are named calculate, but their parameter types differ.",
      "The compiler selects the matching overload from the arguments.",
      "The zero check prevents division by zero for an empty goal.",
    ],
  },
  15: {
    file: "studyplanner/lessons/lecture15/ParameterPassingDemo.java",
    output: "30 / Completed / 3",
    walkthrough: [
      "Java passes every argument by value, including object references.",
      "Reassigning the local primitive minutes does not change the caller's variable.",
      "The copied references still point to the same Task and array, so their contents can change.",
    ],
  },
  16: {
    file: "studyplanner/lessons/lecture16/PracticeSession3.java",
    output: "5 standard questions\n12 custom questions",
    walkthrough: [
      "PracticeBlock's constructor initializes each booked block.",
      "book(String) chooses a default number of questions.",
      "The overloaded book(String, int) lets the caller choose a different amount.",
    ],
  },
  17: {
    file: "studyplanner/lessons/lecture17/ReturningObjectsDemo.java",
    output: "Java review\nTopics: 2",
    walkthrough: [
      "reschedule constructs and returns a new Topic object.",
      "countTopics solves the tree by counting this node plus its child trees.",
      "The null check is the recursion base case that stops the calls.",
    ],
  },
  18: {
    file: "studyplanner/lessons/lecture18/AccessControlDemo.java",
    output: "Ava Patel · 86",
    walkthrough: [
      "private protects quizScore from direct outside changes.",
      "The public getter exposes the score through a controlled method.",
      "protected and package-private members have narrower sharing rules than public members.",
    ],
  },
  19: {
    file: "studyplanner/lessons/lecture19/FinalAndGcDemo.java",
    output: "S104 · 240 min limit\nDraft reference cleared; collection timing is JVM-managed",
    walkthrough: [
      "final prevents the daily limit from being reassigned.",
      "A final field can be set by the constructor and then remains fixed.",
      "Clearing the last reference makes an object eligible for collection; System.gc() is only a request, not a guarantee.",
    ],
  },
  20: {
    file: "studyplanner/lessons/lecture20/PracticeSession4.java",
    output: "Goal remaining: 180\nThree-day plan: 120",
    walkthrough: [
      "The account's progress is private and can only be changed through addStudy().",
      "The weekly target is final, so it cannot accidentally change mid-plan.",
      "totalForDays recursively adds one day's minutes until the base case reaches zero days.",
    ],
  },
  21: {
    file: "studyplanner/lessons/lecture21/StudyPlanner.java",
    output: "Monday · 90 min goal\nGoal met",
    walkthrough: [
      "Settings is static nested: it does not need a StudyPlanner instance.",
      "DayPlan is an inner class and can read its enclosing planner's settings.",
      "GoalCheck is local to one method and exists only while reviewDay() runs.",
    ],
  },
  22: {
    file: "studyplanner/lessons/lecture22/InheritanceBasicsDemo.java",
    output: "Ava Patel studies Java OOP",
    walkthrough: [
      "Person holds identity that can be reused by different kinds of people.",
      "Student extends Person, so it inherits getName() and adds course-specific data.",
      "The relationship is IS-A: a Student is a Person.",
    ],
  },
  23: {
    file: "studyplanner/lessons/lecture23/InheritanceAccessDemo.java",
    output: "Welcome, Ava Patel · S104",
    walkthrough: [
      "A subclass can use the protected displayName field.",
      "The private id remains hidden, including from the subclass.",
      "The public getter provides controlled access to the identifier.",
    ],
  },
  24: {
    file: "studyplanner/lessons/lecture24/SuperKeywordDemo.java",
    output: "Person: Dr. Rivera · mentors Java",
    walkthrough: [
      "super(name) calls the parent constructor to initialize inherited state.",
      "super.describe() calls the parent implementation explicitly.",
      "Mentor adds its own subject detail to the shared description.",
    ],
  },
  25: {
    file: "studyplanner/lessons/lecture25/PracticeSession5.java",
    output: "Opening Constructors in the video player",
    walkthrough: [
      "LearningMaterial stores behavior shared by different resources.",
      "VideoLesson extends the base class and reuses its constructor and open() method.",
      "The subclass specializes the shared behavior for a video resource.",
    ],
  },
  26: {
    file: "studyplanner/lessons/lecture26/MultilevelInheritanceDemo.java",
    output: "Dr. Rivera · mentor · exam strategy",
    walkthrough: [
      "AdvancedMentor inherits from Mentor, which inherits from StudyMember, which inherits from Person.",
      "Each level adds or specializes behavior while reusing the parent state.",
      "Constructor calls move upward through the hierarchy using super(...).",
    ],
  },
  27: {
    file: "studyplanner/lessons/lecture27/MethodOverridingDemo.java",
    output: "Complete two practice sets\nPrepare a guided review",
    walkthrough: [
      "Both subclasses use the same weeklyPlan() signature as the parent.",
      "@Override asks the compiler to verify that an inherited method is being replaced.",
      "Each role supplies behavior that makes sense for its own type.",
    ],
  },
  28: {
    file: "studyplanner/lessons/lecture28/PolymorphismDemo.java",
    output: "Solve practice questions\nPrepare a lesson",
    walkthrough: [
      "The list stores different concrete objects using one shared parent type.",
      "Java chooses weeklyPlan() from each object's real class at runtime.",
      "This lets one loop work with many study-member types without checking each one manually.",
    ],
  },
  29: {
    file: "studyplanner/lessons/lecture29/PracticeSession6.java",
    output: "Email: Java review starts at 4 PM\nCalendar: Java review starts at 4 PM",
    walkthrough: [
      "ReminderChannel defines one shared capability: send a message.",
      "EmailReminder and CalendarReminder implement that contract differently.",
      "remind() depends on the interface, so either implementation can be passed in.",
    ],
  },
  30: {
    file: "studyplanner/lessons/lecture30/AbstractAndInterfaceDemo.java",
    output: "Ava Patel: Review constructors\nCompleted: 8",
    walkthrough: [
      "An abstract class can store shared state while requiring subclasses to implement nextStep().",
      "Trackable is an interface describing a capability rather than a shared parent state.",
      "Student extends one class and implements the interface at the same time.",
    ],
  },
  31: {
    file: "studyplanner/lessons/lecture31/CompositionVsInheritanceDemo.java",
    output: "Dr. Rivera · 1 topic",
    walkthrough: [
      "AdvancedMentor IS-A Mentor, so inheritance expresses a specialized kind of mentor.",
      "Subject HAS-A list of topics, so it keeps those objects as fields.",
      "Composition is useful when one object owns or uses another without being that type.",
    ],
  },
  32: {
    file: "studyplanner/lessons/lecture32/ConsoleInputDemo.java",
    output: "Ava Patel plans 60 minutes for Java OOP",
    walkthrough: [
      "Scanner makes it convenient to parse tokens and numbers from input.",
      "BufferedReader reads a full line of text efficiently.",
      "Preset input makes the example finish automatically; replace it with System.in for an interactive version.",
    ],
  },
  33: {
    file: "studyplanner/lessons/lecture33/FileHandlingBasics.java",
    output: "09:00 — Reviewed arrays\n09:30 — Completed quiz",
    walkthrough: [
      "FileWriter writes characters to a text file; the second writer appends.",
      "FileReader reads one character at a time until it reaches -1 (end of file).",
      "try-with-resources closes each reader or writer automatically.",
    ],
  },
  34: {
    file: "studyplanner/lessons/lecture34/PracticeSession7.java",
    output: "Java,45\nJava: 45 minutes",
    walkthrough: [
      "ProgressWriter defines a shared report workflow and an abstract formatting step.",
      "CsvWriter and TextWriter each supply their own format implementation.",
      "The caller uses the same print() method for either output style.",
    ],
  },
  35: {
    file: "studyplanner/lessons/lecture35/ByteStreamsDemo.java",
    output: "Copied 4 bytes",
    walkthrough: [
      "FileOutputStream writes raw bytes rather than human-readable characters.",
      "FileInputStream reads the binary resource and transferTo copies it to another stream.",
      "Byte streams suit downloads and binary files; use character streams for text.",
    ],
  },
  36: {
    file: "studyplanner/lessons/lecture36/ExceptionIntroDemo.java",
    output: "Notes file is unavailable\nEnter study time as a number",
    walkthrough: [
      "IOException is checked: Java requires the code to catch it or declare it.",
      "NumberFormatException is unchecked and happens when text is not a valid number.",
      "Handling known failures lets the planner explain what the user can fix.",
    ],
  },
  37: {
    file: "studyplanner/lessons/lecture37/TryCatchFinallyDemo.java",
    output: "Java review\nReader closed\nTask list",
    walkthrough: [
      "try holds operations that may fail; catch handles the IOException.",
      "finally runs whether the read succeeds or fails, so it can clean up resources.",
      "Try-with-resources closes the second reader automatically when the block ends.",
    ],
  },
  38: {
    file: "studyplanner/lessons/lecture38/ThrowThrowsDemo.java",
    output: "Session must be 15–240 minutes",
    walkthrough: [
      "The custom checked exception names a study-planner rule failure.",
      "throw creates and raises the exception when the duration is invalid.",
      "throws documents that validate may pass this exception to its caller.",
    ],
  },
  39: {
    file: "studyplanner/lessons/lecture39/PracticeSession8.java",
    output: "Skipped malformed row: Invalid row\nLoaded 3 study blocks",
    walkthrough: [
      "Each line is parsed independently so one bad row does not stop the whole import.",
      "A shape check catches missing CSV fields; NumberFormatException catches invalid minutes.",
      "The final list contains only records that passed validation.",
    ],
  },
  40: {
    file: "studyplanner/lessons/lecture40/MultithreadingIntro.java",
    output: "Sequential:\nBuild flashcards on main\nCalculate progress on main\nConcurrent:\nTasks run on separate threads; their order may vary",
    walkthrough: [
      "The first two calls run one after another on the main thread.",
      "start() asks the JVM to run each task concurrently on another thread.",
      "join() waits for both tasks; concurrent print order is not guaranteed.",
    ],
  },
  41: {
    file: "studyplanner/lessons/lecture41/ThreadCreationDemo.java",
    output: "Flashcards prepared\nProgress calculated\nReminder queued\n(Order may vary)",
    walkthrough: [
      "A Thread subclass puts the task in run().",
      "Runnable separates the task from the thread that runs it.",
      "A lambda is a short form of Runnable when there is one abstract method.",
    ],
  },
  42: {
    file: "studyplanner/lessons/lecture42/ThreadLifecycleDemo.java",
    output: "Before start: NEW\nTimer task is running\nAfter join: TERMINATED\nCalled by main\nDirect-call state: NEW",
    walkthrough: [
      "A new Thread begins in NEW state.",
      "start() creates a separate execution path; join() waits until it terminates.",
      "Calling run() directly does not start a thread—it executes on the current thread.",
    ],
  },
  43: {
    file: "studyplanner/lessons/lecture43/ThreadPriorityJoinDemo.java",
    output: "Practice set finished\nProgress report ready",
    walkthrough: [
      "Thread priorities are hints to the scheduler, not guarantees about order.",
      "join() blocks the calling thread until the target thread completes.",
      "The report starts only after the practice task has finished.",
    ],
  },
  44: {
    file: "studyplanner/lessons/lecture44/PracticeSession9.java",
    output: "Revision complete\nQuiz generation complete\nReminder setup complete\nWeekly plan can now be summarized",
    walkthrough: [
      "Each independent activity is represented as a Thread.",
      "All work starts before the program waits, so tasks can overlap.",
      "The summary is printed only after join() confirms every task is done.",
    ],
  },
  45: {
    file: "studyplanner/lessons/lecture45/SynchronizationDemo.java",
    output: "Exactly one student reserves the 4 PM slot; the other finds it unavailable.",
    walkthrough: [
      "Both threads share one allocator object and compete for one slot.",
      "synchronized allows only one thread at a time inside reserve().",
      "The availability check and update happen together, preventing two winners.",
    ],
  },
  46: {
    file: "studyplanner/lessons/lecture46/InterThreadCommunicationDemo.java",
    output: "Next: Review constructors",
    walkthrough: [
      "The consumer calls wait() when the queue is empty; wait releases the object's monitor.",
      "The producer adds a task and calls notifyAll() while synchronized on the same queue.",
      "The consumer wakes, checks the condition again in a while loop, then removes the task.",
    ],
  },
  47: {
    file: "studyplanner/lessons/lecture47/ThreadControlDemo.java",
    output: "Pause requested\nResume requested\nStop requested\nTimer stopped safely",
    walkthrough: [
      "The timer checks pause and stop flags cooperatively instead of using unsafe stop/suspend methods.",
      "wait() pauses while paused; resumeTimer() changes the flag and notifies the worker.",
      "stopTimer() signals the loop to finish, and join() waits for a clean shutdown.",
    ],
  },
  48: {
    file: "studyplanner/lessons/lecture48/PracticeSession10.java",
    output: "One student reserves the slot; the other waits. Releasing it wakes the next student.",
    walkthrough: [
      "The synchronized methods protect the shared count of available focus slots.",
      "A waiting thread calls wait() when there is no slot; finish() releases one and notifies waiters.",
      "The while loop checks the condition again after waking, so only one student uses the slot at once.",
    ],
  },
};
