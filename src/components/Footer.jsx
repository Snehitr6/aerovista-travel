
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaPinterestP,
} from "react-icons/fa6";

import {
  Plane,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const footerGroups = [
  {
    title: "EXPLORE",
    links: [
      ["Home", "#home"],
      ["Destinations", "#destinations"],
      ["Travel Packages", "#packages"],
      ["Our Services", "#services"],
    ],
  },
  {
    title: "COMPANY",
    links: [
      ["About Us", "#about"],
      ["Book a Flight", "#flight-search"],
      ["Contact Us", "#contact"],
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    icon: FaFacebookF,
    url: "https://www.facebook.com/",
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/",
  },
  {
    label: "YouTube",
    icon: FaYoutube,
    url: "https://www.youtube.com/",
  },
  {
    label: "X",
    icon: FaXTwitter,
    url: "https://x.com/",
  },
  {
    label: "Pinterest",
    icon: FaPinterestP,
    url: "https://www.pinterest.com/",
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#home" className="brand footer-logo">
              <span className="brand-icon">
                <Plane size={23} />
              </span>

              <span>
                <strong>
                  AERO<span>VISTA</span>
                </strong>
                <small>TRAVEL BEYOND</small>
              </span>
            </a>

            <p>
              Bringing the world closer, one journey at a time.
              Discover new places and create unforgettable memories
              with AeroVista Travels.
            </p>

            <div className="footer-contact">
              <a href="mailto:hello@aerovista.example">
                <Mail size={16} />
                hello@aerovista.example
              </a>

              <a href="#contact">
                <MapPin size={16} />
                Bengaluru, India
              </a>

              <a href="tel:+919686996869">
                <Phone size={16} />
                +91 96869 96869
              </a>
            </div>

            <div className="footer-socials">
              {socialLinks.map(({ label, icon: Icon, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {footerGroups.map((group) => (
            <div className="footer-links" key={group.title}>
              <h4>{group.title}</h4>

              {group.links.map(([label, href]) => (
                <a href={href} key={label}>
                  {label}
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          ))}

          <div className="footer-newsletter">
            <span className="footer-kicker">
              YOUR NEXT ADVENTURE
            </span>

            <h3>Let the world surprise you.</h3>

            <p>
              Discover amazing destinations and start planning
              your next journey today.
            </p>

            <a href="#destinations" className="btn btn-primary">
              Explore destinations
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} AeroVista Travels.
            All rights reserved.
          </p>

          <a href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
