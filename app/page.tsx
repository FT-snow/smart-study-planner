import Link from "next/link";
import SonarGridDemo from "@/components/ui/demo";

const outcomes = [
  { co: "CSC2104.1", title: "Fundamentals", range: "Lectures 1–13", count: 13, description: "Variables, decisions, loops, arrays, classes, and methods." },
  { co: "CSC2104.2", title: "Classes in depth", range: "Lectures 14–21", count: 8, description: "Constructors, parameters, access, recursion, and nested classes." },
  { co: "CSC2104.3", title: "Inheritance and I/O", range: "Lectures 22–35", count: 14, description: "Class hierarchies, polymorphism, interfaces, and files." },
  { co: "CSC2104.4", title: "Exceptions and threads", range: "Lectures 36–48", count: 13, description: "Validation, recovery, concurrency, and communication." },
];

export default function HomePage() {
  return (
    <>
      <SonarGridDemo />

      <section className="home-facts" aria-label="Course contents">
        <div><strong>48</strong><span>lecture examples</span></div>
        <div><strong>4</strong><span>course outcomes</span></div>
        <div><strong>1</strong><span>study planner project</span></div>
      </section>

      <section className="outcomes-section">
        <div className="section-title">
          <div>
            <p className="eyebrow">Course map</p>
            <h2>Follow the syllabus</h2>
          </div>
          <Link className="text-link" href="/concepts">All lectures →</Link>
        </div>
        <div className="outcome-list">
          {outcomes.map((outcome) => (
            <Link className="outcome-row" href="/concepts" key={outcome.co}>
              <span className="outcome-code">{outcome.co}</span>
              <span className="outcome-copy">
                <strong>{outcome.title}</strong>
                <span>{outcome.description}</span>
              </span>
              <span className="outcome-range">{outcome.range}</span>
              <span className="outcome-count">{outcome.count}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-note">
        <div>
          <p className="eyebrow">How to use this project</p>
          <h2>Read the idea. Inspect the code. Trace the output.</h2>
        </div>
        <p>
          This is a frontend-only learning interface. Java examples and sample output are included with the lessons; the browser does not compile or run Java.
        </p>
        <Link className="text-link" href="/build">View the build guide →</Link>
      </section>
    </>
  );
}
