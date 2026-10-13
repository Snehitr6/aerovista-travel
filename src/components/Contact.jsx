import { useState } from "react";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  CalendarDays,
  Users,
  Plane,
  ArrowRight,
  Sparkles,
  RotateCcw,
} from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  destination: "",
  date: "",
  travelers: "1",
  message: "",
};

const today = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function update(event) {
    const { name, value } = event.target;

    setForm((previous) => ({ ...previous, [name]: value }));
    setSubmitted(false);
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (form.date && form.date < today()) {
      setError("Please choose today or a future departure date.");
      return;
    }

    if (!form.name.trim() || !form.destination.trim()) {
      setError("Please enter your name and destination.");
      return;
    }

    setError("");
    setSubmitted(true);

    // Frontend demo only. This does not send or store an enquiry.
  }

  function resetForm() {
    setForm(initialForm);
    setSubmitted(false);
    setError("");
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-heading reveal">
          <span className="section-kicker">
            <Sparkles size={13} className="contact-kicker-icon" />
            YOUR NEXT ADVENTURE AWAITS
          </span>

          <h2>
            Let's make your next trip <span>happen.</span>
          </h2>

          <p>
            Have a destination in mind? Tell us what you're dreaming of
            and start planning your next journey.
          </p>
        </div>

        <div className="contact-layout">
          <div className="contact-copy reveal">
            <div className="contact-visual">
              <div className="contact-visual-image" />

              <div className="contact-visual-overlay">
                <span className="contact-visual-icon">
                  <Plane size={22} />
                </span>
                <div>
                  <strong>Somewhere wonderful awaits.</strong>
                  <span>Your next chapter starts here.</span>
                </div>
              </div>
            </div>

            <div className="contact-details">
              <div className="contact-detail-card">
                <span className="contact-icon">
                  <Mail size={19} />
                </span>
                <div>
                  <small>EMAIL US</small>
                  <a href="mailto:hello@aerovista.example">
                    hello@aerovista.example
                  </a>
                </div>
              </div>

              <div className="contact-detail-card">
                <span className="contact-icon">
                  <Phone size={19} />
                </span>
                <div>
                  <small>CALL US</small>
                  <a href="tel:+919686996869">
                    +91 96869 96869
                  </a>
                </div>
              </div>

              <div className="contact-detail-card">
                <span className="contact-icon">
                  <MapPin size={19} />
                </span>
                <div>
                  <small>OUR BASE</small>
                  <span>Bengaluru, India</span>
                </div>
              </div>
            </div>

            <p className="contact-note">
              Demo contact details. Replace the example email and phone
              number with your actual business contact information before
              deployment.
            </p>
          </div>

          <div className="contact-form-card reveal reveal-delay-2">
            {!submitted ? (
              <>
                <div className="form-card-heading">
                  <span className="contact-form-step">
                    <span>01</span> / LET'S GET STARTED
                  </span>
                  <h3>Tell us about your trip.</h3>
                  <p>Share a few details to shape your travel plans.</p>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="contact-name">Full name *</label>
                      <input
                        id="contact-name"
                        name="name"
                        value={form.name}
                        onChange={update}
                        placeholder="Your name"
                        autoComplete="name"
                        maxLength={100}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="contact-email">Email address *</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={update}
                        placeholder="you@example.com"
                        autoComplete="email"
                        maxLength={254}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="contact-destination">
                        Dream destination *
                      </label>
                      <input
                        id="contact-destination"
                        name="destination"
                        value={form.destination}
                        onChange={update}
                        placeholder="e.g. Bali, Dubai, Paris"
                        maxLength={120}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="contact-date">
                        Departure date
                      </label>
                      <div className="contact-input-icon">
                        <CalendarDays size={16} />
                        <input
                          id="contact-date"
                          name="date"
                          type="date"
                          min={today()}
                          value={form.date}
                          onChange={update}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-travelers">
                      Number of travelers
                    </label>
                    <div className="contact-input-icon">
                      <Users size={16} />
                      <select
                        id="contact-travelers"
                        name="travelers"
                        value={form.travelers}
                        onChange={update}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                          <option key={number} value={number}>
                            {number}{" "}
                            {number === 1 ? "traveler" : "travelers"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-message">
                      Tell us more <span>(optional)</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={update}
                      placeholder="Interests, activities or anything you'd like us to know..."
                      rows={4}
                      maxLength={1000}
                    />
                    <span className="contact-character-count">
                      {form.message.length}/1000
                    </span>
                  </div>

                  {error && (
                    <p className="field-error" role="alert">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary form-submit"
                  >
                    Prepare my enquiry <Send size={17} />
                  </button>

                  <p className="form-privacy">
                    <ShieldIcon />
                    Your information stays in this demo and is not sent
                    to a server.
                  </p>
                </form>
              </>
            ) : (
              <div className="contact-success" role="status">
                <span className="contact-success-icon">
                  <CheckCircle2 size={35} />
                </span>

                <span className="section-kicker">ENQUIRY PREPARED</span>
                <h3>Looking good, {form.name.trim()}!</h3>
                <p>
                  Your sample trip details are ready. This website demo
                  does not send your enquiry to a travel agent.
                </p>

                <div className="contact-trip-summary">
                  <div>
                    <MapPin size={17} />
                    <span>
                      <small>DESTINATION</small>
                      <strong>{form.destination}</strong>
                    </span>
                  </div>

                  <div>
                    <Users size={17} />
                    <span>
                      <small>TRAVELERS</small>
                      <strong>
                        {form.travelers}{" "}
                        {form.travelers === "1" ? "traveler" : "travelers"}
                      </strong>
                    </span>
                  </div>

                  <div>
                    <CalendarDays size={17} />
                    <span>
                      <small>DEPARTURE</small>
                      <strong>{form.date || "Flexible dates"}</strong>
                    </span>
                  </div>

                  <div>
                    <Mail size={17} />
                    <span>
                      <small>CONTACT EMAIL</small>
                      <strong className="contact-summary-email">
                        {form.email}
                      </strong>
                    </span>
                  </div>
                </div>

                <a
                  href="#destinations"
                  className="btn btn-primary contact-success-link"
                >
                  Explore destinations <ArrowRight size={17} />
                </a>

                <button
                  type="button"
                  className="contact-reset-button"
                  onClick={resetForm}
                >
                  <RotateCcw size={15} /> Prepare another enquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ShieldIcon() {
  return (
    <span className="contact-privacy-icon" aria-hidden="true">
      <CheckCircle2 size={13} />
    </span>
  );
}
