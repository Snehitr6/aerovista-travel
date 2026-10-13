import {
  Ticket,
  Hotel,
  Map,
  Headphones,
  ShieldCheck,
  Compass,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const services = [
  {
    id: "01",
    icon: Ticket,
    title: "Flight bookings",
    text: "Find routes and explore flight options for your next adventure.",
    label: "FLY WITH EASE",
    href: "#flight-search",
  },
  {
    id: "02",
    icon: Hotel,
    title: "Stay & comfort",
    text: "Discover comfortable stays to make every trip special.",
    label: "REST YOUR WAY",
    href: "#packages",
  },
  {
    id: "03",
    icon: Map,
    title: "Custom itineraries",
    text: "Explore sample travel packages designed around your interests.",
    label: "YOUR OWN JOURNEY",
    href: "#packages",
  },
  {
    id: "04",
    icon: Headphones,
    title: "Travel assistance",
    text: "Get in touch with our team for help planning your journey.",
    label: "HERE TO HELP",
    href: "#contact",
  },
  {
    id: "05",
    icon: ShieldCheck,
    title: "Travel guidance",
    text: "Learn about the essentials to consider before your trip.",
    label: "TRAVEL PREPARED",
    href: "#contact",
  },
  {
    id: "06",
    icon: Compass,
    title: "Local experiences",
    text: "Find inspiration for memorable places beyond the usual stops.",
    label: "GO BEYOND",
    href: "#destinations",
  },
];

export default function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="services-intro reveal">
          <div className="services-heading-copy">
            <span className="section-kicker">
              <Sparkles size={13} className="services-kicker-icon" />
              MORE THAN A TICKET
            </span>

            <h2>
              Every detail, <span>thoughtfully planned.</span>
            </h2>

            <p>
              From your first flight search to the final destination,
              discover travel services that make planning feel effortless.
            </p>
          </div>

          <a href="#contact" className="services-intro-link">
            Let's plan your trip <ArrowRight size={17} />
          </a>
        </div>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.id}
                className={`service-card reveal reveal-delay-${
                  (index % 3) + 1
                }`}
              >
                <div className="service-card-top">
                  <span className="service-number">{service.id}</span>

                  <span className="service-icon">
                    <Icon size={23} strokeWidth={1.8} />
                  </span>

                  <span className="service-card-arrow" aria-hidden="true">
                    <ArrowUpRight size={19} />
                  </span>
                </div>

                <span className="service-label">{service.label}</span>

                <h3>{service.title}</h3>

                <p>{service.text}</p>

                <a
                  href={service.href}
                  className="service-link"
                  aria-label={`Learn more about ${service.title}`}
                >
                  Explore service
                  <ArrowRight size={16} />
                </a>
              </article>
            );
          })}
        </div>

        <div className="services-bottom reveal">
          <div className="services-bottom-icon">
            <Compass size={23} />
          </div>

          <div className="services-bottom-copy">
            <h3>Have a destination in mind?</h3>
            <p>
              Explore our destinations and discover your next getaway.
            </p>
          </div>

          <a href="#destinations" className="services-bottom-button">
            Explore destinations <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}