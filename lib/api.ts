/**
 * Every request the planner page makes to the Java backend lives here.
 *
 * The backend (in ../backend) is a Spring Boot app on http://localhost:8080.
 * These helpers keep the page component free of fetch/HTTP details: the page
 * calls `api.subjects()`, `api.addTask(...)`, and so on.
 */

/** Base URL, override with NEXT_PUBLIC_API_URL (for Vercel deploys etc.). */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/* ---------------- Data types matching the Java DTOs ---------------- */

export type Subject = {
  id: number;
  code: string;
  name: string;
  targetMinutes: number;
  color: string;
};

export type Task = {
  id: number;
  subjectId: number;
  title: string;
  dueDate: string;
  estimatedMinutes: number;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
  overdue: boolean;
};

export type Session = {
  id: number;
  subjectId: number;
  topic: string;
  date: string;
  time: string;
  durationMinutes: number;
  completed: boolean;
};

export type SubjectProgress = {
  subjectId: number;
  code: string;
  name: string;
  color: string;
  targetMinutes: number;
  completedMinutes: number;
  percentComplete: number;
};

/** GET /api/progress — all dashboard numbers, computed by Java. */
export type Progress = {
  weekStart: string;
  weekEnd: string;
  weeklyGoalMinutes: number;
  completedMinutesThisWeek: number;
  percentOfGoal: number;
  openTasks: number;
  overdueTasks: number;
  upcomingSessions: number;
  subjects: SubjectProgress[];
};

/* ---------------- The one place HTTP errors become readable ---------------- */

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/** Small shared fetch wrapper: JSON in, friendly error out. */
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(15000),
    ...options,
  });

  if (!response.ok) {
    let message = `Request failed (${response.status}). Is the backend running on ${BASE_URL}?`;
    try {
      const body = (await response.json()) as { message?: string };
      if (body && typeof body.message === "string" && body.message) message = body.message;
    } catch {
      // Not JSON (e.g. connection refused) — keep the readable default above.
    }
    throw new ApiError(response.status, message);
  }

  if (response.status === 204) {
    // DELETE / reset return no body at all.
    return undefined as T;
  }
  return (await response.json()) as T;
}

/* ---------------- One object with all the calls the page needs ---------------- */

export const api = {
  subjects: () => request<Subject[]>("/api/subjects"),

  addSubject: (body: { code: string; name: string; targetMinutes: number; color: string }) =>
    request<Subject>("/api/subjects", { method: "POST", body: JSON.stringify(body) }),

  removeSubject: (id: number) => request<void>(`/api/subjects/${id}`, { method: "DELETE" }),

  tasks: () => request<Task[]>("/api/tasks"),

  addTask: (body: {
    subjectId: number;
    title: string;
    dueDate: string;
    estimatedMinutes: number;
    priority: string;
  }) => request<Task>("/api/tasks", { method: "POST", body: JSON.stringify(body) }),

  toggleTask: (id: number) => request<Task>(`/api/tasks/${id}/toggle`, { method: "PATCH" }),

  removeTask: (id: number) => request<void>(`/api/tasks/${id}`, { method: "DELETE" }),

  sessions: () => request<Session[]>("/api/sessions"),

  addSession: (body: {
    subjectId: number;
    topic: string;
    date: string;
    time: string;
    durationMinutes: number;
  }) => request<Session>("/api/sessions", { method: "POST", body: JSON.stringify(body) }),

  toggleSession: (id: number) => request<Session>(`/api/sessions/${id}/toggle`, { method: "PATCH" }),

  removeSession: (id: number) => request<void>(`/api/sessions/${id}`, { method: "DELETE" }),

  progress: () => request<Progress>("/api/progress"),

  saveWeeklyGoal: (weeklyGoalMinutes: number) =>
    request<{ weeklyGoalMinutes: number }>("/api/settings", {
      method: "PUT",
      body: JSON.stringify({ weeklyGoalMinutes }),
    }),

  /** Restores the Java sample plan, like the old "reset sample planner" button. */
  resetPlanner: () => request<void>("/api/planner/reset", { method: "POST" }),
};
