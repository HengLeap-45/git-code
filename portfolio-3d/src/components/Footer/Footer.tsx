import { useEffect, useState } from "react";
import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";
import { profile } from "../../data/profile";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-white/10 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-sm text-fg-muted">
          © {year} {profile.name}. Built with React, Three.js &amp; care.
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}

export function SocialLinks({ className = "" }: { className?: string }) {
  const items = [
    { href: profile.socials.github, label: "GitHub", Icon: Github },
    { href: profile.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: profile.socials.twitter, label: "X (Twitter)", Icon: Twitter },
    { href: profile.socials.email, label: "Email", Icon: Mail },
  ];
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="focus-ring glass-button inline-flex rounded-lg p-2.5 text-fg-muted hover:text-fg"
          >
            <Icon size={18} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Thin gradient bar at top of viewport showing page scroll progress. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}

/** Appears after scrolling down; returns the user to the top. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="focus-ring glass-button fixed bottom-6 right-6 z-50 rounded-full p-3"
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}

/** Custom cursor only on fine-pointer desktop devices. Disabled for touch and reduced motion. */
export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] h-4 w-4 rounded-full border border-cyan-400 mix-blend-difference"
      style={{ transform: `translate(${pos.x - 8}px, ${pos.y - 8}px)` }}
    />
  );
}
