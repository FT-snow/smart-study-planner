import Link from "next/link";

const buildSteps = [
  {
    number: "01",
    title: "Model the people and records",
    concepts: "Classes · objects · constructors · access control",
    detail: "Create Student, Subject, StudyTask, and StudySession classes. Constructors establish valid starting values; private fields protect each object's state.",
    lectures: "3, 10, 13, 18",
  },
  {
    number: "02",
    title: "Give each object useful behavior",
    concepts: "Methods · overloading · parameters · return values",
    detail: "Add methods to complete a task, reschedule a session, and calculate progress. Use overloads when the same calculation accepts different kinds of input.",
    lectures: "12, 14–17",
  },
  {
    number: "03",
    title: "Connect the model",
    concepts: "Inheritance · interfaces · polymorphism · composition",
    detail: "Share person details through a parent class. Let StudyPlan contain subjects and sessions. Use an interface when several reminder types share one capability.",
    lectures: "22–31",
  },
  {
    number: "04",
    title: "Enforce planner rules",
    concepts: "Conditions · exceptions · validation",
    detail: "Reject empty topics, invalid session lengths, duplicate time slots, and dates that do not make sense. Report each problem with a clear exception or message.",
    lectures: "4–5, 36–39",
  },
  {
    number: "05",
    title: "Read and write study data",
    concepts: "Console input · text files · byte streams",
    detail: "Read a preset study plan, save a progress report, and recover from missing or malformed files. These examples use only Java's standard library.",
    lectures: "32–35",
  },
  {
    number: "06",
    title: "Coordinate concurrent work",
    concepts: "Threads · synchronization · wait/notify",
    detail: "Run independent planner tasks at the same time, protect a limited focus slot, and notify the next waiting session when a slot is released.",
    lectures: "40–48",
  },
];

const classMap = [
  { name: "Person", kind: "base class", children: ["Student", "StudyMember"] },
  { name: "StudyMember", kind: "abstract", children: ["Mentor", "Tutor"] },
  { name: "Mentor", kind: "parent class", children: ["AdvancedMentor"] },
  { name: "StudyPlan", kind: "has-a", children: ["Student", "Subject[]", "StudySession[]", "StudyTask[]"] },
  { name: "Subject", kind: "has-a", children: ["Topic[]", "StudyResource[]"] },
];

export default function BuildPage() {
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Project walkthrough</p>
          <h1>How the planner is put together</h1>
          <p className="page-description">
            The lessons build from basic values to a small object model, then add rules, files, and concurrent work.
          </p>
        </div>
      </div>

      <section className="build-model panel panel-padding">
        <div className="section-title">
          <div>
            <p className="eyebrow">Domain model</p>
            <h2>Choose classes from the study-planning problem</h2>
          </div>
          <span className="badge">OOP map</span>
        </div>
        <div className="class-map">
          {classMap.map((item) => (
            <article className="class-map-row" key={item.name}>
              <div>
                <code>{item.name}</code>
                <span>{item.kind}</span>
              </div>
              <span className="class-map-arrow" aria-hidden="true">→</span>
              <p>{item.children.join(" · ")}</p>
            </article>
          ))}
        </div>
        <p className="build-caption">
          “is-a” relationships use inheritance. “has-a” relationships use fields and collections (composition).
        </p>
      </section>

      <section className="build-code-grid">
        <article className="source-card">
          <div className="source-card-heading">
            <div>
              <p className="eyebrow">Composition example</p>
              <code className="source-file-name">StudyPlan.java · integration sketch</code>
            </div>
          </div>
          <pre className="java-code"><code>{`import java.util.ArrayList;
import java.util.List;

class StudyPlan {
    private final Student student;
    private final List<Subject> subjects = new ArrayList<>();
    private final List<StudySession> sessions = new ArrayList<>();

    StudyPlan(Student student) {
        this.student = student;
    }

    void addSubject(Subject subject) {
        subjects.add(subject);
    }

    void addSession(StudySession session) {
        sessions.add(session);
    }
}`}</code></pre>
          <p className="build-caption">The plan contains other objects. Each class can be tested and explained separately.</p>
        </article>

        <aside className="build-callout">
          <p className="eyebrow">One important distinction</p>
          <h2>This site teaches the Java implementation.</h2>
          <p>
            The Next.js frontend stores lesson text, code examples, and review progress in the browser. It displays the Java source and sample output but does not execute it.
          </p>
          <Link className="text-link" href="/concepts">Open the lecture examples →</Link>
        </aside>
      </section>

      <section className="build-steps-section">
        <div className="section-title">
          <div>
            <p className="eyebrow">From idea to project</p>
            <h2>Build it in small steps</h2>
          </div>
        </div>
        <ol className="build-steps">
          {buildSteps.map((step) => (
            <li className="build-step" key={step.number}>
              <span className="build-step-number">{step.number}</span>
              <div className="build-step-main">
                <h3>{step.title}</h3>
                <p className="build-step-concepts">{step.concepts}</p>
                <p>{step.detail}</p>
                <span className="build-step-lectures">Lectures {step.lectures}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="build-footer-link">
        <p>Want to see one idea at a time?</p>
        <Link className="button" href="/concepts">Browse all 48 lessons</Link>
      </div>
    </>
  );
}
