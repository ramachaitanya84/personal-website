import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import KonamiEgg from "@/components/konami-egg";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chaitanya Mukkamala",
  description: "Product leader focused on AI/LLM platforms, APIs, and scaled growth.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');document.documentElement.className=t==='light'?'light':'dark';}catch(e){}`,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <TopNav />
        {children}
        <Footer />
        <KonamiEgg />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center">
        <p className="text-sm" style={{ color: "var(--fg-subtle)" }}>
          Open to Director / VP Product roles in AI.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="mailto:ramachaitanya@gmail.com"
            className="link-accent text-sm transition-colors"
          >
            ramachaitanya@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/ramachaitanya"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="link-accent transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

function TopNav() {
  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ background: "var(--nav-bg)", borderColor: "var(--border)" }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 text-sm">
        <Link
          href="/"
          className="font-semibold tracking-tight"
          style={{ color: "var(--fg)" }}
        >
          Chaitanya Mukkamala
        </Link>
        <div className="flex items-center gap-6">
          <div className="flex gap-6 text-sm" style={{ color: "var(--fg-muted)" }}>
            <Link href="/" className="transition-colors hover:text-[var(--fg)]">Home</Link>
            <Link href="/projects" className="transition-colors hover:text-[var(--fg)]">Work</Link>
            <Link href="/writing" className="transition-colors hover:text-[var(--fg)]">Writing</Link>
            <Link href="/profile" className="transition-colors hover:text-[var(--fg)]">About</Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
