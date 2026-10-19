"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "smart-study-planner-workspace-v1";

type PlannerSubject = {
  id: string;
  code: string;
  name: string;
  targetMinutes: number;
  color: string;
};

type PlannerTask = {
  id: string;
  subjectId: string;
  title: string;
  dueDate: string;
  estimatedMinutes: number;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
};

type PlannerSession = {
  id: string;
  subjectId: string;
  topic: string;
  date: string;
  time: string;
  durationMinutes: number;
  completed: boolean;
};

type PlannerWorkspace = {
  weeklyGoalMinutes: number;
  subjects: PlannerSubject[];
  tasks: PlannerTask[];
  sessions: PlannerSession[];
};

const emptyWorkspace: PlannerWorkspace = {
  weeklyGoalMinutes: 600,
  subjects: [],
  tasks: [],
  sessions: [],
};

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateAfter(days: number) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return dateKey(date);
}

function createId(prefix: string) {
  return `${prefix}-${globalThis.crypto?.randomUUID?.() ?? Date.now().toString(36)}`;
}

function createStarterWorkspace(): PlannerWorkspace {
  const javaId = "subject-java";
  const mathId = "subject-math";
  const physicsId = "subject-physics";
  const writingId = "subject-writing";

  return {
    weeklyGoalMinutes: 600,
    subjects: [
      { id: javaId, code: "CSC2104", name: "Java OOP", targetMinutes: 240, color: "blue" },
      { id: mathId, code: "MAT1201", name: "Discrete Mathematics", targetMinutes: 180, color: "gold" },
      { id: physicsId, code: "PHY1102", name: "Physics", targetMinutes: 120, color: "green" },
      { id: writingId, code: "ENG1101", name: "Academic Writing", targetMinutes: 60, color: "violet" },
    ],
    tasks: [
      {
        id: "task-constructors",
        subjectId: javaId,
        title: "Review constructors and object setup",
        dueDate: dateAfter(1),
        estimatedMinutes: 35,
        priority: "High",
        completed: false,
      },
      {
        id: "task-induction",
        subjectId: mathId,
        title: "Finish induction practice set",
        dueDate: dateAfter(2),
        estimatedMinutes: 45,
        priority: "Medium",
        completed: false,
      },
      {
        id: "task-physics",
        subjectId: physicsId,
        title: "Summarize Newton's laws",
        dueDate: dateAfter(3),
        estimatedMinutes: 30,
        priority: "Low",
        completed: false,
      },
      {
        id: "task-writing",
        subjectId: writingId,
        title: "Draft the assignment outline",
        dueDate: dateAfter(4),
        estimatedMinutes: 25,
        priority: "Medium",
        completed: false,
      },
    ],
    sessions: [
      {
        id: "session-java-today",
        subjectId: javaId,
        topic: "Build a StudySession class",
        date: dateAfter(0),
        time: "16:30",
        durationMinutes: 40,
        completed: false,
      },
      {
        id: "session-math-tomorrow",
        subjectId: mathId,
        topic: "Work through induction examples",
        date: dateAfter(1),
        time: "17:00",
        durationMinutes: 50,
        completed: false,
      },
      {
        id: "session-java-review",
        subjectId: javaId,
        topic: "Practice inheritance questions",
        date: dateAfter(3),
        time: "15:30",
        durationMinutes: 45,
        completed: false,
      },
      {
        id: "session-physics-review",
        subjectId: physicsId,
        topic: "Work through force diagrams",
        date: dateAfter(4),
        time: "16:00",
        durationMinutes: 35,
        completed: false,
      },
      {
        id: "session-writing-review",
        subjectId: writingId,
        topic: "Organize the essay outline",
        date: dateAfter(5),
        time: "14:00",
        durationMinutes: 30,
        completed: false,
      },
    ],
  };
}

function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (hours === 0) return `${remaining} min`;
  return remaining ? `${hours}h ${remaining}m` : `${hours}h`;
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", { weekday: "short", month: "short", day: "numeric" }).format(date);
}

function weekBounds() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  return { start: dateKey(start), end: dateKey(end) };
}

export default function PlannerPage() {
  const [workspace, setWorkspace] = useState<PlannerWorkspace>(emptyWorkspace);
  const [ready, setReady] = useState(false);
  const [storageNotice, setStorageNotice] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setWorkspace(createStarterWorkspace());
      } else {
        const parsed: unknown = JSON.parse(saved);
        if (
          typeof parsed === "object"
          && parsed !== null
          && "subjects" in parsed
          && "tasks" in parsed
          && "sessions" in parsed
          && Array.isArray(parsed.subjects)
          && Array.isArray(parsed.tasks)
          && Array.isArray(parsed.sessions)
        ) {
          setWorkspace(parsed as PlannerWorkspace);
        } else {
          setWorkspace(createStarterWorkspace());
        }
      }
    } catch {
      setWorkspace(createStarterWorkspace());
      setStorageNotice("Saved planner data could not be read. A fresh sample plan is shown.");
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
    } catch {
      setStorageNotice("Browser storage is unavailable. Changes may not persist after you leave this page.");
    }
  }, [ready, workspace]);

  const subjectNames = useMemo(
    () => new Map(workspace.subjects.map((subject) => [subject.id, subject.name])),
    [workspace.subjects],
  );
  const bounds = weekBounds();
  const completedThisWeek = workspace.sessions
    .filter((session) => session.completed && session.date >= bounds.start && session.date <= bounds.end)
    .reduce((total, session) => total + session.durationMinutes, 0);
  const openTasks = workspace.tasks.filter((task) => !task.completed);
  const progress = workspace.weeklyGoalMinutes > 0
    ? Math.min(100, Math.round((completedThisWeek / workspace.weeklyGoalMinutes) * 100))
    : 0;
  const upcomingSessions = [...workspace.sessions]
    .filter((session) => !session.completed)
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
  const orderedTasks = [...workspace.tasks].sort((a, b) =>
    Number(a.completed) - Number(b.completed) || a.dueDate.localeCompare(b.dueDate),
  );

  function addSubject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const subject: PlannerSubject = {
      id: createId("subject"),
      code: String(values.get("code") ?? "").trim(),
      name: String(values.get("name") ?? "").trim(),
      targetMinutes: Number(values.get("targetHours")) * 60,
      color: String(values.get("color") ?? "blue"),
    };
    setWorkspace((current) => ({ ...current, subjects: [...current.subjects, subject] }));
    form.reset();
  }

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const task: PlannerTask = {
      id: createId("task"),
      subjectId: String(values.get("subjectId") ?? ""),
      title: String(values.get("title") ?? "").trim(),
      dueDate: String(values.get("dueDate") ?? ""),
      estimatedMinutes: Number(values.get("estimatedMinutes")),
      priority: String(values.get("priority") ?? "Medium") as PlannerTask["priority"],
      completed: false,
    };
    setWorkspace((current) => ({ ...current, tasks: [...current.tasks, task] }));
    form.reset();
  }

  function addSession(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const session: PlannerSession = {
      id: createId("session"),
      subjectId: String(values.get("subjectId") ?? ""),
      topic: String(values.get("topic") ?? "").trim(),
      date: String(values.get("date") ?? ""),
      time: String(values.get("time") ?? ""),
      durationMinutes: Number(values.get("durationMinutes")),
      completed: false,
    };
    setWorkspace((current) => ({ ...current, sessions: [...current.sessions, session] }));
    form.reset();
  }

  function toggleTask(taskId: string) {
    setWorkspace((current) => ({
      ...current,
      tasks: current.tasks.map((task) => task.id === taskId ? { ...task, completed: !task.completed } : task),
    }));
  }

  function toggleSession(sessionId: string) {
    setWorkspace((current) => ({
      ...current,
      sessions: current.sessions.map((session) => session.id === sessionId
        ? { ...session, completed: !session.completed }
        : session),
    }));
  }

  function removeSubject(subjectId: string) {
    const name = subjectNames.get(subjectId) ?? "this subject";
    if (!window.confirm(`Remove ${name} and its tasks and sessions?`)) return;
    setWorkspace((current) => ({
      ...current,
      subjects: current.subjects.filter((subject) => subject.id !== subjectId),
      tasks: current.tasks.filter((task) => task.subjectId !== subjectId),
      sessions: current.sessions.filter((session) => session.subjectId !== subjectId),
    }));
  }

  function saveWeeklyGoal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const value = Number(new FormData(form).get("weeklyGoalHours"));
    setWorkspace((current) => ({ ...current, weeklyGoalMinutes: value * 60 }));
  }

  function resetSamplePlan() {
    if (!window.confirm("Reset this planner to the sample subjects, tasks, and sessions?")) return;
    setWorkspace(createStarterWorkspace());
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>My study planner</h1>
          <p className="page-description">Organize subjects, make room for focused sessions, and keep track of what is next.</p>
        </div>
        <span className="badge">{ready ? "Saved in this browser" : "Loading planner…"}</span>
      </div>

      {storageNotice ? <p className="error-message" role="status">{storageNotice}</p> : null}

      <section className="planner-summary">
        <div className="planner-summary-heading">
          <div>
            <p className="eyebrow">Weekly study goal</p>
            <h2>{formatMinutes(completedThisWeek)} <span>of {formatMinutes(workspace.weeklyGoalMinutes)}</span></h2>
          </div>
          <form className="planner-goal-form" key={`goal-${ready}-${workspace.weeklyGoalMinutes}`} onSubmit={saveWeeklyGoal}>
            <label htmlFor="weekly-goal-hours">Goal per week</label>
            <div className="planner-goal-control">
              <input
                id="weekly-goal-hours"
                name="weeklyGoalHours"
                type="number"
                min={1}
                max={80}
                step={0.5}
                defaultValue={workspace.weeklyGoalMinutes / 60}
              />
              <span>hours</span>
              <button className="button button-secondary button-small" type="submit">Update</button>
            </div>
          </form>
        </div>
        <div className="progress-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${progress}% of weekly study goal completed`}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="planner-stat-row">
          <div><strong>{workspace.subjects.length}</strong><span>Subjects</span></div>
          <div><strong>{openTasks.length}</strong><span>Open tasks</span></div>
          <div><strong>{upcomingSessions.length}</strong><span>Upcoming sessions</span></div>
        </div>
      </section>

      <div className="planner-columns">
        <section className="planner-panel">
          <div className="section-title">
            <div><p className="eyebrow">Calendar</p><h2>Upcoming sessions</h2></div>
            <span className="table-secondary">{upcomingSessions.length} planned</span>
          </div>
          {upcomingSessions.length === 0 ? <p className="planner-empty">No sessions planned. Add one below.</p> : null}
          <div className="planner-item-list">
            {upcomingSessions.map((session) => (
              <article className="planner-item" key={session.id}>
                <div className="planner-item-copy">
                  <p className="planner-item-meta">{formatDate(session.date)} · {session.time} · {formatMinutes(session.durationMinutes)}</p>
                  <h3>{session.topic}</h3>
                  <p className="table-secondary">{subjectNames.get(session.subjectId) ?? "Subject removed"}</p>
                </div>
                <button className="button button-secondary button-small" type="button" onClick={() => toggleSession(session.id)}>
                  Mark done
                </button>
              </article>
            ))}
            {workspace.sessions.filter((session) => session.completed).length > 0 ? (
              <p className="planner-completed-note">
                {workspace.sessions.filter((session) => session.completed).length} completed session{workspace.sessions.filter((session) => session.completed).length === 1 ? "" : "s"} · counts toward your weekly goal
              </p>
            ) : null}
          </div>
        </section>

        <section className="planner-panel">
          <div className="section-title">
            <div><p className="eyebrow">To do</p><h2>Study tasks</h2></div>
            <span className="table-secondary">{openTasks.length} open</span>
          </div>
          {orderedTasks.length === 0 ? <p className="planner-empty">No tasks yet. Add a small next step below.</p> : null}
          <div className="planner-item-list">
            {orderedTasks.map((task) => (
              <article className={`planner-item${task.completed ? " planner-item-complete" : ""}`} key={task.id}>
                <div className="planner-item-copy">
                  <p className="planner-item-meta">Due {formatDate(task.dueDate)} · {formatMinutes(task.estimatedMinutes)} · {subjectNames.get(task.subjectId) ?? "Subject removed"}</p>
                  <h3>{task.title}</h3>
                  <span className={`badge ${task.priority === "High" ? "badge-danger" : task.priority === "Low" ? "badge-neutral" : "badge-warning"}`}>
                    {task.completed ? "Completed" : task.priority}
                  </span>
                </div>
                <button className="button button-secondary button-small" type="button" onClick={() => toggleTask(task.id)}>
                  {task.completed ? "Reopen" : "Complete"}
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="planner-forms">
        <section className="planner-form-panel">
          <p className="eyebrow">Schedule</p>
          <h2>New study session</h2>
          <form key={`session-${ready}`} onSubmit={addSession}>
            <div className="planner-form-fields">
              <div className="field">
                <label htmlFor="session-subject">Subject</label>
                <select id="session-subject" name="subjectId" required defaultValue="">
                  <option value="" disabled>Select a subject</option>
                  {workspace.subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.code} · {subject.name}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="session-topic">What will you study?</label>
                <input id="session-topic" name="topic" required maxLength={120} placeholder="Review constructors" />
              </div>
              <div className="planner-form-pair">
                <div className="field">
                  <label htmlFor="session-date">Date</label>
                  <input id="session-date" name="date" type="date" required defaultValue={ready ? dateAfter(0) : ""} />
                </div>
                <div className="field">
                  <label htmlFor="session-time">Time</label>
                  <input id="session-time" name="time" type="time" required defaultValue="16:00" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="session-duration">Duration (minutes)</label>
                <input id="session-duration" name="durationMinutes" type="number" min={10} max={240} step={5} required defaultValue={45} />
              </div>
            </div>
            <button className="button" type="submit" disabled={workspace.subjects.length === 0}>Add session</button>
            {workspace.subjects.length === 0 ? <p className="planner-form-note">Add a subject first to schedule sessions.</p> : null}
          </form>
        </section>

        <section className="planner-form-panel">
          <p className="eyebrow">Next action</p>
          <h2>Add a task</h2>
          <form key={`task-${ready}`} onSubmit={addTask}>
            <div className="planner-form-fields">
              <div className="field">
                <label htmlFor="task-title">Task</label>
                <input id="task-title" name="title" required maxLength={120} placeholder="Finish practice questions" />
              </div>
              <div className="field">
                <label htmlFor="task-subject">Subject</label>
                <select id="task-subject" name="subjectId" required defaultValue="">
                  <option value="" disabled>Select a subject</option>
                  {workspace.subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.code} · {subject.name}</option>)}
                </select>
              </div>
              <div className="planner-form-pair">
                <div className="field">
                  <label htmlFor="task-due-date">Due date</label>
                  <input id="task-due-date" name="dueDate" type="date" required defaultValue={ready ? dateAfter(1) : ""} />
                </div>
                <div className="field">
                  <label htmlFor="task-priority">Priority</label>
                  <select id="task-priority" name="priority" defaultValue="Medium"><option>Low</option><option>Medium</option><option>High</option></select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="task-estimate">Estimated minutes</label>
                <input id="task-estimate" name="estimatedMinutes" type="number" min={5} max={600} step={5} required defaultValue={30} />
              </div>
            </div>
            <button className="button" type="submit" disabled={workspace.subjects.length === 0}>Add task</button>
            {workspace.subjects.length === 0 ? <p className="planner-form-note">Add a subject first to create tasks.</p> : null}
          </form>
        </section>

        <section className="planner-form-panel">
          <p className="eyebrow">Course list</p>
          <h2>Add a subject</h2>
          <form key={`subject-${ready}`} onSubmit={addSubject}>
            <div className="planner-form-fields">
              <div className="field">
                <label htmlFor="subject-name">Subject name</label>
                <input id="subject-name" name="name" required maxLength={80} placeholder="Object-Oriented Programming" />
              </div>
              <div className="field">
                <label htmlFor="subject-code">Course code</label>
                <input id="subject-code" name="code" required maxLength={20} placeholder="CSC2104" />
              </div>
              <div className="field">
                <label htmlFor="subject-hours">Weekly target (hours)</label>
                <input id="subject-hours" name="targetHours" type="number" min={0.5} max={40} step={0.5} required defaultValue={3} />
              </div>
              <div className="field">
                <label htmlFor="subject-color">Label color</label>
                <select id="subject-color" name="color" defaultValue="blue"><option value="blue">Blue</option><option value="gold">Gold</option><option value="green">Green</option><option value="violet">Violet</option></select>
              </div>
            </div>
            <button className="button" type="submit">Add subject</button>
          </form>
          <div className="planner-subject-list">
            {workspace.subjects.map((subject) => {
              const completedMinutes = workspace.sessions
                .filter((session) => session.subjectId === subject.id && session.completed)
                .reduce((total, session) => total + session.durationMinutes, 0);
              const subjectProgress = subject.targetMinutes > 0
                ? Math.min(100, Math.round((completedMinutes / subject.targetMinutes) * 100))
                : 0;
              return (
                <div className="planner-subject" key={subject.id}>
                  <div className="planner-subject-top">
                    <div>
                      <span className={`subject-swatch swatch-${subject.color}`} aria-hidden="true" />
                      <strong>{subject.name}</strong>
                      <span className="table-secondary">{subject.code}</span>
                    </div>
                    <button className="text-button" type="button" onClick={() => removeSubject(subject.id)}>Remove</button>
                  </div>
                  <div className="planner-subject-progress">
                    <span>{formatMinutes(completedMinutes)} / {formatMinutes(subject.targetMinutes)}</span>
                    <span className="mini-progress"><span style={{ width: `${subjectProgress}%` }} /></span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className="planner-footer-actions">
        <p>Your plan is stored in this browser and is not synced to other devices.</p>
        <button className="text-button" type="button" onClick={resetSamplePlan}>Reset sample planner</button>
      </div>
    </>
  );
}
