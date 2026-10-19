"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { SonarGrid } from "@/components/ui/sonar-grid";

const settings = {
  ringWidth: 76,
  speed: 220,
  amplitude: 1.2,
  pingEvery: 4.2,
  interactive: true,
  spacing: 30,
  baseOpacity: 0.2,
  useThemeColor: true,
  color: "#3b559f",
};

export default function SonarGridDemo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  const reduceMotion = useReducedMotion();
  const enter = (delay: number) => reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <SonarGrid
      ringWidth={s.ringWidth}
      speed={s.speed}
      amplitude={s.amplitude}
      pingEvery={s.pingEvery}
      interactive={s.interactive}
      spacing={s.spacing}
      baseOpacity={s.baseOpacity}
      color={s.useThemeColor ? undefined : s.color}
      pingArea={[0.22, 0.18, 0.78, 0.82]}
      className="sonar-hero bg-background"
      role="region"
      aria-label="Interactive Java study planner introduction"
    >
      <div className="sonar-hero-content mx-auto w-full">
        <motion.p {...enter(0)} className="sonar-hero-eyebrow">
          CSC2104 · Java OOP
        </motion.p>
        <motion.h1 {...enter(0.07)} className="sonar-hero-title text-foreground">
          Learn Java by building a study planner.
        </motion.h1>
        <motion.p {...enter(0.14)} className="sonar-hero-description text-muted-foreground">
          Explore 48 small examples, follow the ideas, and see how the classes fit together.
        </motion.p>
        <motion.div {...enter(0.21)} className="sonar-hero-actions">
          <Link className="button" href="/concepts">
            Browse all 48 lessons
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <Link className="button button-secondary" href="/build">
            See the build guide
          </Link>
        </motion.div>
        <p className="sonar-hero-hint">Tap or click the dot field to send a study signal.</p>
      </div>
    </SonarGrid>
  );
}
