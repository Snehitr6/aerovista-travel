import {
  ArrowUpRight,
  Globe2,
  Heart,
  Compass,
  Plane,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "People first",
    description: "Thoughtful travel planning",
  },
  {
    icon: Globe2,
    title: "World minded",
    description: "More ways to discover",
  },
  {
    icon: ShieldCheck,
    title: "Travel prepared",
    description: "Helpful planning guidance",
  },
];

const highlights = [
  { value: "08", label: "Featured destinations" },
  { value: "03", label: "Sample holiday packages" },
  { value: "24/7", label: "Planning inspiration" },
];

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-layout">
          <div className="about-visual reveal">
            <div className="about-image-glow" />

            <div
              className="about-main-image"
              role="img"
              aria-label="Airplane flying over a beautiful landscape"
            />

            <div
              className="about-small-image"
              role="img"
              aria-label="Beautiful tropical island destination"
            />

            <div className="about-stamp">
              <span className="about-stamp-icon">
                <Globe2 size={23} />
              </span>
              <strong>GO BEYOND</strong>
              <span>THE ORDINARY</span>
            </div>

            <div className="about-image-caption">
              <span className="about-caption-icon">
                <Compass size={19} />
              </span>
              <div>
                <strong>Made for the curious.</strong>
                <span>Inspired by the world.</span>
              </div>
            </div>

            <div className="about-floating-badge">
              <span className="about-floating-icon">
                <Plane size={18} />
              </span>
              <div>
                <strong>Your next adventure</strong>
                <span>Starts with a plan</span>
              </div>
            </div>
          </div>

          <div className="about-copy reveal reveal-delay-2">
            <span className="section-kicker">
              <Sparkles size={13} className="about-kicker-icon" />
              THE AEROVISTA STORY
            </span>

            <h2>
              The journey matters
              <br />
              as much as <span>the destination.</span>
            </h2>

            <p className="about-lead">
              At AeroVista, we believe travel is about more than getting
              from one place to another. It is about the people you meet,
              the perspectives you gain, and the memories you bring home.
            </p>

            <p className="about-description">
              We want to make planning feel simpler, discovering feel
              exciting, and every new adventure feel a little closer.
              Explore destinations, compare sample packages, and start
              imagining where you could go next.
            </p>

            <div className="about-values">
              {values.map((item) => {
                const Icon = item.icon;

                return (
                  <div className="about-value" key={item.title}>
                    <span className="value-icon">
                      <Icon size={19} />
                    </span>
                    <div>
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </div>
                  </div>
                );
              })}
            </div>

            <a href="#contact" className="btn btn-dark about-cta">
              Let's plan your journey <ArrowUpRight size={18} />
            </a>

            <a href="#destinations" className="about-secondary-link">
              Explore destinations <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="about-highlights reveal">
          <div className="about-highlights-intro">
            <span className="section-kicker">YOUR NEXT CHAPTER</span>
            <h3>A little inspiration goes a long way.</h3>
          </div>

          {highlights.map((item) => (
            <div className="about-highlight" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <p className="about-demo-note">
          AeroVista is a travel website demo. Destination counts and package
          details describe the sample content displayed on this site, not
          verified customer numbers or live travel inventory.
        </p>
      </div>
    </section>
  );
}