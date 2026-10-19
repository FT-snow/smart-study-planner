# Smart Study Planner — CSC2104 Java OOP

A student-focused study planner and CSC2104 learning project. Organize subjects, weekly goals, tasks, and study sessions, then explore all 48 Java topics through examples from the planner. The interface uses TypeScript, Tailwind CSS v4, a shadcn-compatible `components/ui` structure, Motion, and Lucide icons.

## Pages

- `/` — simple student workflow and links into the planner
- `/planner` — manage subjects, tasks, study sessions, and a weekly goal
- `/concepts` — searchable lectures 1–48, Java examples, copy-code, sample output, and local lesson progress
- `/build` — how a student uses the planner and how the Java model fits together

This is a **frontend-only** project. Planner data and lesson progress are saved in the current browser. The site displays Java examples but does not compile or execute them; the shown console output is a teaching preview.

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
