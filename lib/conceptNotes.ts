export type ConceptNote = {
  javaIdea: string;
  studyUse: string;
};

export const conceptNotes: Record<number, ConceptNote> = {
  1: {
    javaIdea: "Object-oriented programming groups related data and actions into classes. Procedural code handles the same work as a sequence of separate steps.",
    studyUse: "Compare a loose study log with a StudyPlan object that keeps subjects, tasks, and planning behavior together.",
  },
  2: {
    javaIdea: "OOP makes programs easier to extend and maintain by modeling real things as reusable objects.",
    studyUse: "Add another learner or subject by creating another object instead of rewriting the planning workflow.",
  },
  3: {
    javaIdea: "Variables have types. Primitive types store simple values; String stores text, var infers a local type, and final marks a value that should not change.",
    studyUse: "Store a student's semester, study minutes, score, subject name, completion state, and daily goal with suitable types.",
  },
  4: {
    javaIdea: "Operators calculate values, compare them, combine conditions, set individual flags, and choose between two results.",
    studyUse: "Calculate progress, compare study time with a goal, combine deadline conditions, and set task-priority flags.",
  },
  5: {
    javaIdea: "if/else and switch select a path based on a condition or matching value.",
    studyUse: "Choose a task priority with if/else and route a study request to revision, practice, or reading with switch.",
  },
  6: {
    javaIdea: "Loops repeat work: for counts, while repeats while a condition is true, and do-while runs at least once.",
    studyUse: "Review each topic, process an assignment queue, and retry finding an open focus slot with different loop types.",
  },
  7: {
    javaIdea: "A small program combines variables, operators, conditions, and loops to solve one practical problem.",
    studyUse: "Summarize weekly study time, completed tasks, remaining work, and the next action for each subject.",
  },
  8: {
    javaIdea: "Type conversion changes a value's type. Wrapper classes let primitive values work with collections; boxing and unboxing convert automatically.",
    studyUse: "Parse form values for semester and minutes, convert scores, and keep study durations in a List<Integer>.",
  },
  9: {
    javaIdea: "An array stores a fixed-size group of values; multidimensional arrays organize rows and columns.",
    studyUse: "Keep daily quiz scores in an array and represent a weekly study timetable as a two-dimensional grid.",
  },
  10: {
    javaIdea: "A class describes fields and behavior. An object is one concrete instance created from that class.",
    studyUse: "StudyResource defines a learning material record; each book, link, or video becomes a StudyResource object.",
  },
  11: {
    javaIdea: "Practice combining classes, arrays, loops, parsing, and wrapper types.",
    studyUse: "Read resource rows from CSV text and create a StudyResource[] library for a subject.",
  },
  12: {
    javaIdea: "Methods give a named action reusable inputs and optionally return a result.",
    studyUse: "ResourceLibrary methods search resources, mark one as used, and calculate the remaining reading list.",
  },
  13: {
    javaIdea: "Constructors initialize objects. Overloaded constructors can provide default, full, or copy-based initialization.",
    studyUse: "Create study sessions with default values, full details, or a copy of an existing session before rescheduling it.",
  },
  14: {
    javaIdea: "Method overloading uses the same method name with different parameter lists.",
    studyUse: "ProgressCalculator.calculate can calculate task progress, subject progress, session progress, or a combined weekly score.",
  },
  15: {
    javaIdea: "Java passes every argument by value. For objects, the copied value is a reference to the same object; changing a local reference does not replace the caller's reference.",
    studyUse: "Show how a study duration, StudyResource object, and timetable array behave when passed to planner methods.",
  },
  16: {
    javaIdea: "Practice overloads and constructors together with a realistic record workflow.",
    studyUse: "Plan a practice session using different constructor and method overloads for review and timed exercises.",
  },
  17: {
    javaIdea: "A method may return a newly created object. Recursion solves a problem by calling the same method on a smaller part.",
    studyUse: "Return a rescheduled StudySession and recursively total topics inside a nested subject plan.",
  },
  18: {
    javaIdea: "Access modifiers control where a field or method can be used: public, protected, package-private, or private.",
    studyUse: "Keep private quiz details inside StudyProgress while exposing only the approved summary to the planner interface.",
  },
  19: {
    javaIdea: "final prevents reassignment, overriding, or subclassing depending on where it is used. Garbage collection reclaims unreachable objects when the JVM decides to.",
    studyUse: "Keep a course code or maximum daily goal constant and observe when a temporary draft plan becomes unreachable.",
  },
  20: {
    javaIdea: "Practice fields, visibility, final values, methods, and recursion in one class-based task.",
    studyUse: "Manage a learner's progress account and recursively calculate the study minutes needed for overdue tasks.",
  },
  21: {
    javaIdea: "A static nested class belongs to its outer class; an inner class belongs to an outer object. Local and anonymous classes can be declared inside methods.",
    studyUse: "Represent a planner's weekly settings, an inner day plan, a local study reminder, and an anonymous focus rule.",
  },
  22: {
    javaIdea: "Inheritance lets a derived class reuse and extend fields or methods from a base class.",
    studyUse: "Student and Mentor reuse identity and contact details from a Person base class.",
  },
  23: {
    javaIdea: "A subclass can access inherited protected members, but cannot directly access private members.",
    studyUse: "A Student subtype can use a protected display name while the Person identifier stays private behind a getter.",
  },
  24: {
    javaIdea: "super calls a parent constructor or method. A subclass can also hide a field with its own field of the same name.",
    studyUse: "Mentor calls the Person constructor and extends the shared description with a subject specialty.",
  },
  25: {
    javaIdea: "Practice base and derived classes while reusing parent initialization and behavior.",
    studyUse: "Create textbook, video, and quiz resource types from shared LearningMaterial behavior.",
  },
  26: {
    javaIdea: "Multilevel inheritance forms a chain where a class extends a class that already extends another class.",
    studyUse: "Person → StudyMember → Mentor → AdvancedMentor adds identity, learning role, guidance, and specialization step by step.",
  },
  27: {
    javaIdea: "Overriding replaces an inherited method implementation while keeping the same method signature.",
    studyUse: "Student, Mentor, and Tutor provide their own role descriptions and study recommendations.",
  },
  28: {
    javaIdea: "Runtime polymorphism calls the override belonging to the object's actual class, even through a base-class reference.",
    studyUse: "A List<StudyMember> can hold students, mentors, and tutors; each produces its own progress summary.",
  },
  29: {
    javaIdea: "Practice overriding and dynamic dispatch through a common parent type.",
    studyUse: "Send one reminder call to email, in-app, or calendar notification objects.",
  },
  30: {
    javaIdea: "An abstract class shares common state and requires subclasses to fill in missing behavior. An interface defines a capability that unrelated classes can implement.",
    studyUse: "Abstract StudyMember requires a progress summary; Trackable marks study objects that can report completion.",
  },
  31: {
    javaIdea: "Inheritance models an IS-A relationship. Composition models a HAS-A relationship by keeping other objects as fields.",
    studyUse: "An AdvancedMentor is a Mentor, while a Subject has a list of topics and learning resources.",
  },
  32: {
    javaIdea: "Scanner and BufferedReader read text input. A demo can use preset input for repeatable runs or read the keyboard interactively.",
    studyUse: "Collect a student's name, course, and daily goal from preset or interactive console input.",
  },
  33: {
    javaIdea: "Character streams read and write text. FileReader and FileWriter work with text files; try-with-resources closes them safely.",
    studyUse: "Write, append, and read a daily study log or a text subject plan.",
  },
  34: {
    javaIdea: "An abstract writer can define a shared report workflow while subclasses choose the output format.",
    studyUse: "Write the same progress report as CSV or readable text using separate ProgressWriter implementations.",
  },
  35: {
    javaIdea: "Byte streams transfer raw bytes; data streams can encode primitive values as binary data.",
    studyUse: "Copy a downloaded resource file and save numeric quiz results to a compact binary record.",
  },
  36: {
    javaIdea: "Checked exceptions must be caught or declared. Unchecked exceptions usually signal invalid operations or programming mistakes.",
    studyUse: "Handle a missing study file separately from an invalid array index or malformed study duration.",
  },
  37: {
    javaIdea: "try contains risky code, catch handles failures, and finally runs cleanup. Try-with-resources closes closeable resources automatically.",
    studyUse: "Read a saved planner file, handle missing or malformed data, and always close the reader.",
  },
  38: {
    javaIdea: "throw raises an exception; throws declares that a method may pass an exception to its caller. Custom exception classes make errors specific.",
    studyUse: "Reject invalid or duplicate study sessions with InvalidStudySessionException and report missing students or full focus slots clearly.",
  },
  39: {
    javaIdea: "Practice file reading and writing while catching expected I/O and parsing problems.",
    studyUse: "Save and load task CSV records, skip malformed rows, and report a missing planner file without crashing.",
  },
  40: {
    javaIdea: "A process can contain multiple threads that run tasks concurrently and share the same program memory.",
    studyUse: "Compare sequential planning with concurrent resource indexing, reminder preparation, and progress calculation.",
  },
  41: {
    javaIdea: "Create a thread by extending Thread, implementing Runnable, or supplying a lambda task.",
    studyUse: "Run a flashcard build and a progress calculation as separate study-planner tasks.",
  },
  42: {
    javaIdea: "start creates a new thread of execution; run called directly is just a normal method call. A thread moves through lifecycle states until it terminates.",
    studyUse: "Watch a focus-timer task move from NEW through RUNNABLE and waiting to TERMINATED.",
  },
  43: {
    javaIdea: "Thread priorities are scheduling hints. join makes one thread wait for another to finish.",
    studyUse: "Wait for an exam-practice task to finish before generating its progress summary.",
  },
  44: {
    javaIdea: "Independent tasks can run concurrently, then join can wait for all required work to finish.",
    studyUse: "Run revision, quiz generation, and reminder preparation in parallel before building the weekly plan.",
  },
  45: {
    javaIdea: "Synchronization protects shared state so only one thread changes a critical value at a time.",
    studyUse: "Make several planning threads compete for one focus slot and ensure exactly one session receives it.",
  },
  46: {
    javaIdea: "wait releases an object's monitor while a thread waits; notify or notifyAll wakes waiting threads to check their condition again.",
    studyUse: "A task producer adds study tasks while a planner consumer waits until the queue has work.",
  },
  47: {
    javaIdea: "Modern Java uses cooperative pause and stop signals rather than unsafe forced thread suspension or termination.",
    studyUse: "Pause, resume, interrupt, and cleanly stop a focus timer using flags and thread interruption.",
  },
  48: {
    javaIdea: "Combine synchronization and inter-thread communication to coordinate producers, consumers, and limited resources.",
    studyUse: "Coordinate exam-week sessions, limited focus slots, and completed tasks with synchronization and communication.",
  },
};
