import Link from "next/link";
import SonarGridDemo from "@/components/ui/demo";

const steps = [
  {
    number: "01",
    title: "Add your subjects",
    description: "Set up every course you are taking and choose a weekly time target.",
  },
  {
    number: "02",
    title: "List the next tasks",
    description: "Add assignments and revision work with due dates and a time estimate.",
  },
  {
    number: "03",
    title: "Schedule study sessions",
    description: "Choose a subject, give the session one topic, and mark it complete when you finish.",
  },
];

export default function HomePage() {
  return (
    <>
      <SonarGridDemo />

      <section className="student-flow">
        <div className="section-title">
          <div>
            <p className="eyebrow">A student's weekly routine</p>
            <h2>Keep the plan simple</h2>
          </div>
          <Link className="text-link" href="/planner">Open my planner →</Link>
        </div>
        <div className="student-flow-grid">
          {steps.map((step) => (
            <article className="student-flow-step" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-note">
        <div>
          <p className="eyebrow">CSC2104 · Java OOP</p>
          <h2>The planner is also a way to explore all 48 Java topics.</h2>
        </div>
        <p>
          Each lesson connects a programming idea to the subjects, tasks, and sessions a student organizes here.
        </p>
        <Link className="text-link" href="/concepts">Browse the concepts →</Link>
      </section>
    </>
  );
}
