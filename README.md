# Smart Study Planner — CSC2104 Java OOP

A standalone Next.js learning project for all 48 CSC2104 Java topics. Each lesson includes a plain-language explanation, a study-planner use case, a Java code example, a short walkthrough, and illustrative console output.

## Pages

- `/` — course overview and the four course outcomes
- `/concepts` — searchable lectures 1–48, Java examples, copy-code, sample output, and local lesson progress
- `/build` — how the concepts combine into a study-planner object model

This is a **frontend-only** learning interface. It displays Java examples but does not compile or execute them; the shown output is a teaching preview. Lesson progress is stored in the current browser.

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
