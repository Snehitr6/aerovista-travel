
import { useState } from "react";
import { Plane, Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  ["Home", "#home"],
  ["Destinations", "#destinations"],
  ["Packages", "#packages"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav-container">
        <a href="#home" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-icon"><Plane size={23} /></span>
          <span>
            <strong>AERO<span>VISTA</span></strong>
            <small>TRAVEL BEYOND</small>
          </span>
        </a>

        <div className={`nav-links ${open ? "nav-open" : ""}`}>
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={href === "#home" ? "nav-active" : ""}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-mobile-cta"
            onClick={() => setOpen(false)}
          >
            Plan my trip <ArrowUpRight size={17} />
          </a>
        </div>

        <a href="#flight-search" className="nav-cta">
          Book a flight <ArrowUpRight size={17} />
        </a>

        <button
          type="button"
          className="mobile-menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>
    </header>
  );
}
