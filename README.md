# Smart Study Planner — Java OOP

A student-focused study planner built as a **real Java project**: a Spring Boot
backend owns all subjects, tasks, study sessions and weekly-goal logic, and a
Next.js front end is only its client. Explore the 48 CSC2104 Java lecture
topics through the Concepts page, and let the app itself run on the same ideas.

- **`backend/`** — the Java application (Spring Boot, JPA, H2). Every planner
  rule — sorting, overdue flags, weekly goal math, validation — lives here in
  simple, classroom-style Java. See `JAVA_CONCEPTS_EXPLAINED.txt` for a
  concept-by-concept walkthrough.
- **`app/` + `lib/`** — the Next.js UI. Pages fetch from the Java API; no
  planner logic lives in the browser anymore.

## Pages

- `/planner` — manage subjects, tasks, and sessions; progress comes from `GET /api/progress`.
- `/concepts` — searchable lectures 1–48 with the actual Java source files.
- `/build` — how a student uses the planner and how the Java model fits together.

## API (Spring Boot, port 8080)

| Method | Path | Purpose |
| --- | --- | --- |
| GET/POST | `/api/subjects` | list · create (duplicate codes rejected) |
| DELETE | `/api/subjects/{id}` | removes the subject **and** its tasks/sessions |
| GET/POST | `/api/tasks` | list (open first, sorted by due date) · create |
| PATCH | `/api/tasks/{id}/toggle` | complete / reopen |
| GET/POST | `/api/sessions` | list (soonest first) · schedule |
| PATCH | `/api/sessions/{id}/toggle` | mark done / unmark |
| GET | `/api/progress` | week bounds, goal %, per-subject bars (computed in Java) |
| GET/PUT | `/api/settings` | weekly goal in minutes |
| POST | `/api/planner/reset` | restore the sample plan |

Errors are plain JSON: `{"status": 400, "message": "...", "errors": []}`.

## Run the backend

Needs JDK 17+ and Maven.

```sh
cd backend
mvn spring-boot:run
```

Data persists to `backend/data/` (H2 file database). Delete that folder for a
factory reset, or use the reset endpoint/button. First launch seeds the sample
subjects, tasks, and sessions automatically.

## Run the front end

```sh
bun install        # or npm install
bun run dev        # or npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page talks to
`http://localhost:8080` by default; set `NEXT_PUBLIC_API_URL` to change it.
Start the backend first, or you will see its "Retry" message.

The Java lecture sources still compile on their own:

```sh
mkdir -p java-out
javac --release 17 -d java-out $(find public/java -name '*.java')
java -cp java-out studyplanner.lessons.lecture10.StudyResource
```

## Deploy (optional)

The teacher hasn't asked for hosting, so for the course local run (above) is
all you need. If you ever want it online: host `backend/` on any Java host
(Render, Railway, a VPS — it needs a filesystem for the H2 data folder), then
set `NEXT_PUBLIC_API_URL` to the backend URL in the Vercel dashboard for the
front end (Vercel project rooted at this directory). Do not put GitHub tokens
in source files or commit them.
