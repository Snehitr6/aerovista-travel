
import { ArrowRight, Play, ShieldCheck, Globe2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-image" />
      <div className="hero-overlay" />

      <div className="hero-content container">
        <div className="hero-copy reveal">
          <div className="eyebrow hero-eyebrow">
            <span className="status-dot" />
            YOUR JOURNEY STARTS HERE
          </div>

          <h1>
            The world is
            <br />
            <span>closer</span> than
            <br />
            you think.
          </h1>

          <p>
            Discover extraordinary places, find your perfect flight,
            and turn your next getaway into a story worth telling.
          </p>

          <div className="hero-actions">
            <a href="#flight-search" className="btn btn-primary">
              Explore flights <ArrowRight size={18} />
            </a>
            <a href="#destinations" className="hero-secondary">
              <span className="play-circle"><Play size={15} fill="currentColor" /></span>
              Discover destinations
            </a>
          </div>

          <div className="hero-trust">
            <div className="trust-icon"><ShieldCheck size={21} /></div>
            <div>
              <strong>Travel with confidence</strong>
              <span>Your next adventure, made simpler.</span>
            </div>
          </div>
        </div>

        <div className="hero-side-note">
          <Globe2 size={19} />
          <span>One planet. Endless possibilities.</span>
        </div>

        <div className="hero-index">
          <span>01</span><span className="index-line" /><span>EXPLORE</span>
        </div>
      </div>

      <a href="#flight-search" className="hero-scroll">
        SCROLL TO EXPLORE <span>↓</span>
      </a>
    </section>
  );
}
