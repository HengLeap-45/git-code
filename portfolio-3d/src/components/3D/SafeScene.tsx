import { lazy, Suspense, useEffect, useState } from "react";

const HeroScene = lazy(() => import("./HeroScene"));

function detectSupport(): { webgl: boolean; reducedMotion: boolean; lowPower: boolean } {
  let webgl = false;
  try {
    const canvas = document.createElement("canvas");
    webgl = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    webgl = false;
  }
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lowPower =
    (navigator.hardwareConcurrency ?? 8) <= 4 || window.innerWidth < 640;
  return { webgl, reducedMotion, lowPower };
}

/** Renders the 3D scene only when the device can handle it. Otherwise shows a static fallback. */
export default function SafeScene({ className = "" }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const { webgl, reducedMotion, lowPower } = detectSupport();
    setEnabled(webgl && !reducedMotion && !lowPower);
  }, []);

  if (!enabled) {
    return (
      <div
        className={`fallback-scene ${className}`}
        aria-hidden="true"
        role="presentation"
      />
    );
  }

  return (
    <div className={className} aria-hidden="true">
      <Suspense fallback={<div className="fallback-scene" />}>
        <HeroScene />
      </Suspense>
    </div>
  );
}
