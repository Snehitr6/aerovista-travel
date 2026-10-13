import { useEffect, useState } from "react";
import "./Preloader.css";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2100;

    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));

      setProgress(next);

      if (next >= 100) {
        clearInterval(timer);
        setTimeout(() => onComplete?.(), 180);
      }
    }, 35);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="av-preloader" role="status" aria-label="Loading AeroVista">
      <div className="av-preloader-glow av-glow-one" />
      <div className="av-preloader-glow av-glow-two" />

      <div className="av-preloader-content">
        <div className="av-orbit">
          <span className="av-orbit-dot" />
          <span className="av-plane">✈</span>
        </div>

        <div className="av-brand">
          <span className="av-brand-mark">✈</span>
          <span>AeroVista</span>
        </div>

        <p className="av-preloader-eyebrow">
          YOUR JOURNEY BEGINS HERE
        </p>

        <h1 className="av-preloader-title">
          The world is <span>waiting.</span>
        </h1>

        <p className="av-preloader-subtitle">
          Preparing your next unforgettable journey
        </p>

        <div className="av-flight-path">
          <span className="av-path-line" />
          <span className="av-path-plane">✈</span>
        </div>

        <div className="av-progress-row">
          <span>DISCOVERING NEW HORIZONS</span>
          <span>{progress}%</span>
        </div>

        <div
          className="av-progress-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span
            className="av-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="av-preloader-bottom">
        <span>EXPLORE</span>
        <span className="av-bottom-dot">✦</span>
        <span>EXPERIENCE</span>
        <span className="av-bottom-dot">✦</span>
        <span>ESCAPE</span>
      </div>
    </div>
  );
}