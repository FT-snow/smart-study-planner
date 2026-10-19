import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Study Planner · Java OOP",
  description: "Learn all 48 CSC2104 Java concepts through a study planner project.",
};

const navigation = [
  { label: "My planner", href: "/planner" },
  { label: "How it works", href: "/build" },
  { label: "Java concepts", href: "/concepts" },
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <Link className="brand" href="/" aria-label="Study planner home">
              <span className="brand-copy">
                <strong>Study planner</strong>
                <small>CSC2104 · Java OOP</small>
              </span>
            </Link>
            <nav className="main-nav" aria-label="Main navigation">
              {navigation.map((item) => (
                <Link className="nav-link" href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>
          <main className="main-content">{children}</main>
          <footer className="site-footer">
            <span>Smart Study Planner · CSC2104</span>
            <span>Java examples · Next.js lesson viewer</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
