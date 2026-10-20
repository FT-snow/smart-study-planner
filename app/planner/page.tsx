"use client";

import type { FormEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { api, type Progress, type Session, type Subject, type Task } from "@/lib/api";

/* ---------------- date/number helpers (display only, no planner logic) ------- */

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

/* --------------------------------- page --------------------------------- */

export default function PlannerPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");

  /** Loads the three lists and the dashboard summary from the Java backend. */
  const loadAll = useCallback(async () => {
    const [subjectsData, tasksData, sessionsData, progressData] = await Promise.all([
      api.subjects(),
      api.tasks(),
      api.sessions(),
      api.progress(),
    ]);
    setSubjects(subjectsData);
    setTasks(tasksData);
    setSessions(sessionsData);
    setProgress(progressData);
    setReady(true);
  }, []);

  /** Re-fetches only the summary after every change; the lists update from the API response. */
  const refreshProgress = useCallback(() => {
    api.progress().then(setProgress).catch(() => undefined);
  }, []);

  useEffect(() => {
    loadAll().catch((error: unknown) => {
      setLoadError(
        error instanceof Error && error.message
          ? error.message
          : "Could not reach the planner backend. Start it with the command in the README.",
      );
      setReady(false);
    });
  }, [loadAll]);

  /** Wraps every mutation so failures become a friendly banner message. */
  const runAction = useCallback(async (action: () => Promise<void>) => {
    setActionError("");
    try {
      await action();
      refreshProgress();
    } catch (error: unknown) {
      setActionError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }, [refreshProgress]);

  const subjectNames = useMemo(
    () => new Map<number, string>(subjects.map((subject) => [subject.id, subject.name])),
    [subjects],
  );
  const subjectBars = useMemo(() => {
    if (!progress) return new Map<number, { completedMinutes: number; percentComplete: number }>();
    return new Map<number, { completedMinutes: number; percentComplete: number }>(
      progress.subjects.map((bar) => [bar.subjectId, { completedMinutes: bar.completedMinutes, percentComplete: bar.percentComplete }]),
    );
  }, [progress]);

  const openTasks = tasks.filter((task) => !task.completed);
  const upcomingSessions = sessions.filter((session) => !session.completed);
  const doneSessionCount = sessions.length - upcomingSessions.length;
  const completedThisWeek = progress?.completedMinutesThisWeek ?? 0;
  const goalMinutes = progress?.weeklyGoalMinutes ?? 600;
  const percentOfGoal = progress?.percentOfGoal ?? 0;

  /* ----------------------------- form actions ----------------------------- */

  function addSubject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const code = String(values.get("code") ?? "").trim();
    const name = String(values.get("name") ?? "").trim();
    const targetMinutes = Number(values.get("targetHours")) * 60;
    const color = String(values.get("color") ?? "blue");
    form.reset();
    runAction(async () => {
      const created = await api.addSubject({ code, name, targetMinutes, color });
      setSubjects((current) => [...current, created]);
    });
  }

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const title = String(values.get("title") ?? "").trim();
    const subjectId = Number(values.get("subjectId"));
    const dueDate = String(values.get("dueDate") ?? "");
    const estimatedMinutes = Number(values.get("estimatedMinutes"));
    const priority = String(values.get("priority") ?? "Medium");
    form.reset();
    runAction(async () => {
      const created = await api.addTask({ subjectId, title, dueDate, estimatedMinutes, priority });
      setTasks((current) => [...current, created]);
    });
  }

  function addSession(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const topic = String(values.get("topic") ?? "").trim();
    const subjectId = Number(values.get("subjectId"));
    const date = String(values.get("date") ?? "");
    const time = String(values.get("time") ?? "");
    const durationMinutes = Number(values.get("durationMinutes"));
    form.reset();
    runAction(async () => {
      const created = await api.addSession({ subjectId, topic, date, time, durationMinutes });
      setSessions((current) => [...current, created]);
    });
  }

  function toggleTask(taskId: number) {
    runAction(async () => {
      const updated = await api.toggleTask(taskId);
      setTasks((current) => current.map((task) => (task.id === updated.id ? updated : task)));
    });
  }

  function toggleSession(sessionId: number) {
    runAction(async () => {
      const updated = await api.toggleSession(sessionId);
      setSessions((current) => current.map((session) => (session.id === updated.id ? updated : session)));
    });
  }

  function removeSubject(subjectId: number) {
    const name = subjectNames.get(subjectId) ?? "this subject";
    if (!window.confirm(`Remove ${name} and its tasks and sessions?`)) return;
    runAction(async () => {
      await api.removeSubject(subjectId);
      setSubjects((current) => current.filter((subject) => subject.id !== subjectId));
      setTasks((current) => current.filter((task) => task.subjectId !== subjectId));
      setSessions((current) => current.filter((session) => session.subjectId !== subjectId));
    });
  }

  function saveWeeklyGoal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const weeklyGoalMinutes = Number(new FormData(form).get("weeklyGoalHours")) * 60;
    runAction(async () => {
      await api.saveWeeklyGoal(weeklyGoalMinutes);
    });
  }

  function resetSamplePlan() {
    if (!window.confirm("Reset this planner to the sample subjects, tasks, and sessions?")) return;
    runAction(async () => {
      await api.resetPlanner();
      await loadAll();
    });
  }

  /* ------------------------------- rendering ------------------------------- */

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>My study planner</h1>
          <p className="page-description">Organize subjects, make room for focused sessions, and keep track of what is next.</p>
        </div>
        <span className="badge">{ready ? "Synced with Java backend" : "Loading planner…"}</span>
      </div>

      {loadError ? (
        <div className="planner-empty">
          <p role="alert">{loadError}</p>
          <button className="button button-secondary button-small" type="button" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      ) : null}

      {actionError ? <p className="error-message" role="status">{actionError}</p> : null}

      <section className="planner-summary">
        <div className="planner-summary-heading">
          <div>
            <p className="eyebrow">Weekly study goal</p>
            <h2>{formatMinutes(completedThisWeek)} <span>of {formatMinutes(goalMinutes)}</span></h2>
          </div>
          <form className="planner-goal-form" key={`goal-${ready}-${goalMinutes}`} onSubmit={saveWeeklyGoal}>
            <label htmlFor="weekly-goal-hours">Goal per week</label>
            <div className="planner-goal-control">
              <input
                id="weekly-goal-hours"
                name="weeklyGoalHours"
                type="number"
                min={1}
                max={80}
                step={0.5}
                defaultValue={goalMinutes / 60}
              />
              <span>hours</span>
              <button className="button button-secondary button-small" type="submit">Update</button>
            </div>
          </form>
        </div>
        <div className="progress-track" role="progressbar" aria-valuenow={percentOfGoal} aria-valuemin={0} aria-valuemax={100} aria-label={`${percentOfGoal}% of weekly study goal completed`}>
          <span style={{ width: `${percentOfGoal}%` }} />
        </div>
        <div className="planner-stat-row">
          <div><strong>{subjects.length}</strong><span>Subjects</span></div>
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
            {doneSessionCount > 0 ? (
              <p className="planner-completed-note">
                {doneSessionCount} completed session{doneSessionCount === 1 ? "" : "s"} · counts toward your weekly goal
              </p>
            ) : null}
          </div>
        </section>

        <section className="planner-panel">
          <div className="section-title">
            <div><p className="eyebrow">To do</p><h2>Study tasks</h2></div>
            <span className="table-secondary">{openTasks.length} open</span>
          </div>
          {tasks.length === 0 ? <p className="planner-empty">No tasks yet. Add a small next step below.</p> : null}
          <div className="planner-item-list">
            {tasks.map((task) => (
              <article className={`planner-item${task.completed ? " planner-item-complete" : ""}`} key={task.id}>
                <div className="planner-item-copy">
                  <p className="planner-item-meta">
                    Due {formatDate(task.dueDate)} · {formatMinutes(task.estimatedMinutes)} · {subjectNames.get(task.subjectId) ?? "Subject removed"}
                    {task.overdue ? " · overdue" : ""}
                  </p>
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
                  {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.code} · {subject.name}</option>)}
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
            <button className="button" type="submit" disabled={subjects.length === 0}>Add session</button>
            {subjects.length === 0 ? <p className="planner-form-note">Add a subject first to schedule sessions.</p> : null}
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
                  {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.code} · {subject.name}</option>)}
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
            <button className="button" type="submit" disabled={subjects.length === 0}>Add task</button>
            {subjects.length === 0 ? <p className="planner-form-note">Add a subject first to create tasks.</p> : null}
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
            {subjects.map((subject) => {
              const bar = subjectBars.get(subject.id);
              const completedMinutes = bar?.completedMinutes ?? 0;
              const subjectProgress = bar?.percentComplete ?? 0;
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
        <p>Your plan runs on the Java backend, so it stays available to every device on this machine.</p>
        <button className="text-button" type="button" onClick={resetSamplePlan}>Reset sample planner</button>
      </div>
    </>
  );
}
