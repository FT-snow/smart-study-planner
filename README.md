# Smart Study Planner — CSC2104 Java OOP

A student-focused study planner and CSC2104 learning project. Organize subjects, weekly goals, tasks, and study sessions, then explore all 48 Java topics through examples from the planner. The interface uses TypeScript, Tailwind CSS v4, a shadcn-compatible `components/ui` structure, Motion, and Lucide icons.

## Pages

- `/` — simple student workflow and links into the planner
- `/planner` — manage subjects, tasks, study sessions, and a weekly goal
- `/concepts` — searchable lectures 1–48, actual Java source files, copy-code, sample output, and local lesson progress
- `/build` — how a student uses the planner and how the Java model fits together

The Java files are in `public/java/studyplanner/lessons/lectureNN/`; the Concepts page loads those files directly. Planner data and lesson progress are saved in this browser. The browser displays Java source but does not execute it; the console output is a teaching preview.

To compile the Java lessons locally with JDK 17 or newer:

```sh
mkdir -p java-out
javac --release 17 -d java-out $(find public/java -name '*.java')
java -cp java-out studyplanner.lessons.lecture10.StudyResource
```

## Run with Bun

```sh
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

```sh
bun run build
bun run start
```

## Deploy

Use this directory as the Vercel project root. Deploy through the Vercel CLI or connect a Git repository in Vercel. Authenticate through Vercel's login flow; do not put GitHub tokens in source files or commit them.
