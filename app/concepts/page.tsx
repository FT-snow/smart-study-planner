"use client";

import { useEffect, useMemo, useState } from "react";
import { conceptCatalog } from "@/lib/conceptCatalog";
import { conceptNotes } from "@/lib/conceptNotes";
import { lessonExamples } from "@/lib/lessonExamples";

const PROGRESS_KEY = "study-planner-java-progress-v1";

const groups = [
  { co: "CSC2104.1", title: "Fundamentals", range: "Lectures 1–13" },
  { co: "CSC2104.2", title: "Classes in depth", range: "Lectures 14–21" },
  { co: "CSC2104.3", title: "Inheritance and I/O", range: "Lectures 22–35" },
  { co: "CSC2104.4", title: "Exceptions and threads", range: "Lectures 36–48" },
];

export default function ConceptsPage() {
  const [selectedLecture, setSelectedLecture] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);
  const [progressReady, setProgressReady] = useState(false);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [sourceCode, setSourceCode] = useState("");
  const [sourceLoading, setSourceLoading] = useState(true);
  const [sourceError, setSourceError] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(PROGRESS_KEY);
      if (saved) {
        const values: unknown = JSON.parse(saved);
        if (Array.isArray(values)) {
          setCompleted(values.filter((value): value is number =>
            typeof value === "number" && value >= 1 && value <= 48,
          ));
        }
      }
    } catch {
      window.localStorage.removeItem(PROGRESS_KEY);
    } finally {
      setProgressReady(true);
    }
  }, []);

  useEffect(() => {
    if (progressReady) {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(completed));
    }
  }, [completed, progressReady]);

  const selected = conceptCatalog.find((lesson) => lesson.number === selectedLecture) ?? conceptCatalog[0];
  const note = conceptNotes[selected.number];
  const example = lessonExamples[selected.number];

  useEffect(() => {
    const controller = new AbortController();
    setSourceCode("");
    setSourceError("");
    setSourceLoading(true);

    fetch(`/java/${example.file}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load Java source (${response.status})`);
        return response.text();
      })
      .then((source) => setSourceCode(source))
      .catch((loadError: unknown) => {
        if (controller.signal.aborted) return;
        setSourceError(loadError instanceof Error ? loadError.message : "Could not load this Java example.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setSourceLoading(false);
      });

    return () => controller.abort();
  }, [example.file]);

  const completedCount = completed.length;
  const progressPercent = Math.round((completedCount / conceptCatalog.length) * 100);
  const normalizedQuery = query.trim().toLowerCase();

  const filteredConcepts = useMemo(() => {
    if (!normalizedQuery) return conceptCatalog;
    return conceptCatalog.filter((lesson) =>
      lesson.topic.toLowerCase().includes(normalizedQuery)
      || lesson.co.toLowerCase().includes(normalizedQuery)
      || String(lesson.number) === normalizedQuery.replace(/^l/, ""),
    );
  }, [normalizedQuery]);

  function toggleCompleted() {
    setCompleted((current) => current.includes(selected.number)
      ? current.filter((number) => number !== selected.number)
      : [...current, selected.number].sort((a, b) => a - b));
  }

  async function copyExample() {
    if (!sourceCode) return;
    try {
      await navigator.clipboard.writeText(sourceCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  const previous = selected.number > 1 ? selected.number - 1 : null;
  const next = selected.number < 48 ? selected.number + 1 : null;

  return (
    <>
      <div className="page-heading concepts-heading">
        <div>
          <p className="eyebrow">CSC2104 · Java OOP</p>
          <h1>Concept library</h1>
          <p className="page-description">
            Forty-eight short lessons. Each connects one Java idea to a study-planner example.
          </p>
        </div>
        <span className="badge">{completedCount} / 48 reviewed</span>
      </div>

      <section className="lesson-progress" aria-label="Course progress">
        <div className="progress-track" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100} aria-label={`${progressPercent}% of lessons reviewed`}>
          <span style={{ width: `${progressPercent}%` }} />
        </div>
        <p>{progressReady ? `${progressPercent}% reviewed · progress is saved in this browser` : "Loading saved progress…"}</p>
      </section>

      <div className="concept-explorer">
        <aside className="concept-sidebar" aria-label="Lecture topics">
          <div className="concept-sidebar-heading">
            <p className="eyebrow">Lecture index</p>
            <h2>48 lessons</h2>
          </div>
          <label className="field search-field">
            <span className="visually-hidden">Search Java lessons</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search topics or lecture…"
            />
          </label>

          {groups.map((group) => {
            const lessons = filteredConcepts.filter((lesson) => lesson.co === group.co);
            if (normalizedQuery && lessons.length === 0) return null;

            return (
              <section className="concept-group" key={group.co}>
                <div className="concept-group-heading">
                  <h3>{group.title}</h3>
                  <span>{group.range}</span>
                </div>
                <div className="concept-list">
                  {lessons.map((lesson) => (
                    <button
                      className={`concept-option${lesson.number === selected.number ? " concept-option-selected" : ""}`}
                      type="button"
                      key={lesson.number}
                      aria-pressed={lesson.number === selected.number}
                      onClick={() => setSelectedLecture(lesson.number)}
                    >
                      <span className="concept-number">{completed.includes(lesson.number) ? "✓" : `L${lesson.number}`}</span>
                      <span className="concept-option-topic">{lesson.topic}</span>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
          {filteredConcepts.length === 0 ? <p className="empty-search">No lessons match that search.</p> : null}
        </aside>

        <article className="concept-main" aria-label={`Lecture ${selected.number}: ${selected.topic}`}>
          <header className="concept-detail-heading">
            <p className="eyebrow">{selected.co} · Lecture {selected.number}</p>
            <h2>{selected.topic}</h2>
            <p className="page-description">A short explanation, a planner use case, and a Java implementation.</p>
          </header>

          <div className="concept-note-grid">
            <section className="concept-note">
              <p className="eyebrow">The idea</p>
              <p>{note.javaIdea}</p>
            </section>
            <section className="concept-note">
              <p className="eyebrow">In the study planner</p>
              <p>{note.studyUse}</p>
            </section>
          </div>

          <section className="walkthrough-panel">
            <div className="section-title">
              <div>
                <p className="eyebrow">Read the example</p>
                <h3>What to notice</h3>
              </div>
            </div>
            <ol className="walkthrough-list">
              {example.walkthrough.map((step, index) => (
                <li key={step}>
                  <span className="walkthrough-index">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="source-card">
            <div className="source-card-heading">
              <div>
                <p className="eyebrow">Java example</p>
                <code className="source-file-name">public/java/{example.file}</code>
              </div>
              <button className="button button-secondary button-small" type="button" disabled={!sourceCode} onClick={() => void copyExample()}>
                {copied ? "Copied" : "Copy code"}
              </button>
            </div>
            {sourceError ? <p className="error-message" role="alert">{sourceError}</p> : null}
            <pre className="java-code"><code>{sourceLoading ? "Loading Java source…" : sourceCode}</code></pre>
          </section>

          <details className="expected-output">
            <summary>Show expected console output</summary>
            <pre><code>{example.output}</code></pre>
            <p>This is a teaching preview, not a Java runtime. The Next.js page displays the example but does not execute Java.</p>
          </details>

          <div className="lesson-actions">
            <button className={`button${completed.includes(selected.number) ? " button-secondary" : ""}`} type="button" onClick={toggleCompleted}>
              {completed.includes(selected.number) ? "Mark as not reviewed" : "Mark lesson reviewed"}
            </button>
            <div className="lesson-navigation">
              <button className="button button-secondary button-small" type="button" disabled={!previous} onClick={() => previous && setSelectedLecture(previous)}>
                Previous
              </button>
              <button className="button button-secondary button-small" type="button" disabled={!next} onClick={() => next && setSelectedLecture(next)}>
                Next
              </button>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
