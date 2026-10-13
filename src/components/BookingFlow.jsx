
import { useMemo, useState } from "react";
import {
  Plane,
  Clock,
  Luggage,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Ticket,
  ShieldCheck,
  Users,
  CalendarDays,
  MapPin,
  X,
  SlidersHorizontal,
  ArrowUpDown,
} from "lucide-react";

const AIRLINES = [
  {
    name: "AeroBlue Airways",
    code: "AB 204",
    depart: "06:20",
    arrive: "09:05",
    duration: "2h 45m",
    durationMinutes: 165,
    stops: "Non-stop",
    price: 5499,
  },
  {
    name: "SkyVista Airlines",
    code: "SV 118",
    depart: "10:40",
    arrive: "13:35",
    duration: "2h 55m",
    durationMinutes: 175,
    stops: "Non-stop",
    price: 6299,
  },
  {
    name: "CloudNine Air",
    code: "CN 320",
    depart: "17:15",
    arrive: "20:25",
    duration: "3h 10m",
    durationMinutes: 190,
    stops: "1 stop",
    price: 7199,
  },
];

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function BookingFlow({ search, onClose }) {
  const [selected, setSelected] = useState(null);
  const [passenger, setPassenger] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null);

  // Flight filters and sorting
  const [sort, setSort] = useState("recommended");
  const [stops, setStops] = useState("all");
  const [airline, setAirline] = useState("all");
  const [maxPrice, setMaxPrice] = useState(10000);

  const count = Math.max(1, Number(search?.travelers || 1));

  const flights = useMemo(() => {
    let results = AIRLINES.map((flight, index) => ({
      ...flight,
      id: flight.code,
      total: flight.price * count,
      index,
    }));

    if (stops !== "all") {
      results = results.filter((flight) =>
        stops === "nonstop"
          ? flight.stops === "Non-stop"
          : flight.stops !== "Non-stop"
      );
    }

    if (airline !== "all") {
      results = results.filter(
        (flight) => flight.name === airline
      );
    }

    results = results.filter(
      (flight) => flight.price <= maxPrice
    );

    results.sort((a, b) => {
      if (sort === "price") {
        return a.price - b.price;
      }

      if (sort === "duration") {
        return a.durationMinutes - b.durationMinutes;
      }

      if (sort === "departure") {
        return a.depart.localeCompare(b.depart);
      }

      return a.index - b.index;
    });

    return results;
  }, [count, stops, airline, maxPrice, sort]);

  if (!search) return null;

  function updatePassenger(event) {
    const { name, value } = event.target;

    setPassenger((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  }

  function confirmBooking(event) {
    event.preventDefault();

    if (!selected) {
      setError("Please select a flight first.");
      return;
    }

    if (passenger.name.trim().length < 2) {
      setError("Please enter the passenger's full name.");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger.email)
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^[+]?[\d\s()-]{8,18}$/.test(passenger.phone.trim())) {
      setError("Please enter a valid contact number.");
      return;
    }

    const reference = `AV${Date.now().toString().slice(-8)}`;

    setBooking({
      reference,
      passenger: { ...passenger },
      flight: selected,
      search: { ...search },
      createdAt: new Date().toLocaleString("en-IN"),
    });

    setError("");
  }

  function downloadConfirmation() {
    if (!booking) return;

    const content = [
      "AEROVISTA TRAVELS - DEMO BOOKING CONFIRMATION",
      "",
      `Booking reference: ${booking.reference}`,
      `Passenger: ${booking.passenger.name}`,
      `Email: ${booking.passenger.email}`,
      `Phone: ${booking.passenger.phone}`,
      `From: ${booking.search.from}`,
      `To: ${booking.search.to}`,
      `Departure: ${booking.search.departure}`,
      `Return: ${
        booking.search.trip === "round"
          ? booking.search.returnDate || "Not specified"
          : "One way"
      }`,
      `Flight: ${booking.flight.code} - ${booking.flight.name}`,
      `Passengers: ${booking.search.travelers || 1}`,
      `Sample total: ${money(booking.flight.total)}`,
      `Created: ${booking.createdAt}`,
      "",
      "This is a demonstration booking, not a real airline ticket.",
    ].join("\n");

    const file = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `AeroVista-${booking.reference}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  async function copyReference() {
    try {
      await navigator.clipboard.writeText(booking.reference);
    } catch {
      setError("Unable to copy automatically. Please copy the reference manually.");
    }
  }

  function resetFilters() {
    setSort("recommended");
    setStops("all");
    setAirline("all");
    setMaxPrice(10000);
  }

  return (
    <div
      className="booking-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Flight booking"
    >
      <div className="booking-panel">
        <div className="booking-topbar">
          <a href="#home" className="booking-brand">
            <span className="booking-brand-icon">
              <Plane size={20} />
            </span>
            <span>
              AERO<span>VISTA</span>
            </span>
          </a>

          <button
            className="booking-close"
            type="button"
            onClick={onClose}
            aria-label="Close booking"
          >
            <X size={22} />
          </button>
        </div>

        {booking ? (
          <div className="confirmation-content">
            <div className="confirmation-icon">
              <CheckCircle2 size={42} />
            </div>

            <span className="section-kicker">
              BOOKING DEMONSTRATION COMPLETE
            </span>

            <h2>Your trip is taking shape!</h2>

            <p className="confirmation-subtitle">
              Your demo booking reference has been created.
              No real ticket has been issued.
            </p>

            <div className="reference-card">
              <span>BOOKING REFERENCE</span>
              <strong>{booking.reference}</strong>
              <button type="button" onClick={copyReference}>
                Copy reference
              </button>
            </div>

            {error && (
              <p className="field-error" role="status">
                {error}
              </p>
            )}

            <div className="confirmation-ticket">
              <div className="ticket-heading">
                <span>
                  <Ticket size={18} /> Flight itinerary
                </span>
                <span className="demo-badge">DEMO</span>
              </div>

              <div className="ticket-route">
                <div>
                  <small>FROM</small>
                  <strong>{booking.search.from}</strong>
                  <span>{booking.search.departure || "Date not set"}</span>
                </div>

                <div className="ticket-plane">
                  <Plane size={21} />
                </div>

                <div>
                  <small>TO</small>
                  <strong>{booking.search.to}</strong>
                  <span>
                    {booking.search.trip === "round"
                      ? `Return: ${booking.search.returnDate || "Not specified"}`
                      : "One-way journey"}
                  </span>
                </div>
              </div>

              <div className="ticket-details">
                <div>
                  <small>Passenger</small>
                  <strong>{booking.passenger.name}</strong>
                </div>
                <div>
                  <small>Flight</small>
                  <strong>{booking.flight.code}</strong>
                </div>
                <div>
                  <small>Travelers</small>
                  <strong>{count}</strong>
                </div>
                <div>
                  <small>Sample total</small>
                  <strong>{money(booking.flight.total)}</strong>
                </div>
              </div>
            </div>

            <div className="booking-demo-notice">
              <ShieldCheck size={19} />
              <p>
                This is a frontend demonstration. Payment, airline
                inventory, ticket issuance, and email delivery are
                not connected.
              </p>
            </div>

            <button
              className="btn btn-primary booking-full-button"
              type="button"
              onClick={downloadConfirmation}
            >
              Download confirmation <ArrowRight size={18} />
            </button>

            <button
              className="booking-text-button"
              type="button"
              onClick={onClose}
            >
              Return to AeroVista
            </button>
          </div>
        ) : (
          <>
            <div className="booking-progress">
              <span className={!selected ? "progress-active" : ""}>
                01 <small>Flights</small>
              </span>
              <span className={selected ? "progress-active" : ""}>
                02 <small>Passenger</small>
              </span>
              <span>
                03 <small>Confirmation</small>
              </span>
            </div>

            <div className="booking-intro">
              <span className="section-kicker">
                YOUR JOURNEY, YOUR WAY
              </span>

              <h2>
                {selected ? "Passenger details" : "Choose your flight."}
              </h2>

              <p>
                Compare sample fares and select the flight that suits you.
              </p>
            </div>

            <div className="route-summary">
              <div>
                <span>
                  <MapPin size={14} /> FROM
                </span>
                <strong>{search.from}</strong>
              </div>

              <Plane size={21} />

              <div>
                <span>
                  <MapPin size={14} /> TO
                </span>
                <strong>{search.to}</strong>
              </div>

              <div className="route-date">
                <span>
                  <CalendarDays size={14} /> DEPARTURE
                </span>
                <strong>{search.departure || "Date not set"}</strong>
              </div>
            </div>

            {!selected ? (
              <>
                <div className="booking-filter-panel">
                  <h3>
                    <SlidersHorizontal size={17} />
                    Refine your search
                  </h3>

                  <div className="booking-filter-grid">
                    <label>
                      Stops
                      <select
                        value={stops}
                        onChange={(event) => setStops(event.target.value)}
                      >
                        <option value="all">All flights</option>
                        <option value="nonstop">Non-stop</option>
                        <option value="one-stop">One stop</option>
                      </select>
                    </label>

                    <label>
                      Airline
                      <select
                        value={airline}
                        onChange={(event) => setAirline(event.target.value)}
                      >
                        <option value="all">All airlines</option>
                        {AIRLINES.map((item) => (
                          <option key={item.code} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="booking-price-filter">
                      Maximum price per traveler: {money(maxPrice)}
                      <input
                        type="range"
                        min="5000"
                        max="10000"
                        step="500"
                        value={maxPrice}
                        onChange={(event) =>
                          setMaxPrice(Number(event.target.value))
                        }
                      />
                    </label>

                    <label>
                      <span className="filter-sort-label">
                        <ArrowUpDown size={14} /> Sort by
                      </span>
                      <select
                        value={sort}
                        onChange={(event) => setSort(event.target.value)}
                      >
                        <option value="recommended">Recommended</option>
                        <option value="price">Lowest price</option>
                        <option value="duration">Shortest duration</option>
                        <option value="departure">Departure time</option>
                      </select>
                    </label>
                  </div>

                  <button
                    className="results-reset"
                    type="button"
                    onClick={resetFilters}
                  >
                    Reset filters
                  </button>
                </div>

                <div className="booking-results-count">
                  <strong>{flights.length} flights found</strong>
                  <span>Sample fares · {count} traveler(s)</span>
                </div>

                {flights.length === 0 ? (
                  <div className="results-empty">
                    <Plane size={30} />
                    <h3>No flights match your filters</h3>
                    <p>Try increasing your price limit or clearing filters.</p>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={resetFilters}
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <div className="flight-results-list">
                    {flights.map((flight, index) => (
                      <article
                        className="result-flight-card"
                        key={flight.id}
                      >
                        {index === 1 && (
                          <span className="popular-flight-label">
                            POPULAR CHOICE
                          </span>
                        )}

                        <div className="result-airline">
                          <span className="airline-symbol">
                            <Plane size={19} />
                          </span>
                          <div>
                            <strong>{flight.name}</strong>
                            <small>{flight.code}</small>
                          </div>
                        </div>

                        <div className="result-timing">
                          <div>
                            <strong>{flight.depart}</strong>
                            <small>{search.from.split("(")[0].trim()}</small>
                          </div>

                          <div className="result-duration">
                            <span>{flight.duration}</span>
                            <div className="duration-line">
                              <i />
                            </div>
                            <small>{flight.stops}</small>
                          </div>

                          <div>
                            <strong>{flight.arrive}</strong>
                            <small>{search.to.split("(")[0].trim()}</small>
                          </div>
                        </div>

                        <div className="result-fare">
                          <strong>{money(flight.total)}</strong>
                          <small>
                            {count} traveler{count > 1 ? "s" : ""}
                          </small>

                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => {
                              setSelected(flight);
                              setError("");
                            }}
                          >
                            Select <ArrowRight size={15} />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                <p className="results-disclaimer">
                  <ShieldCheck size={15} />
                  Demo fares only. No live availability or actual booking.
                </p>
              </>
            ) : (
              <div className="passenger-layout">
                <form
                  className="passenger-form"
                  onSubmit={confirmBooking}
                >
                  <button
                    className="booking-back"
                    type="button"
                    onClick={() => {
                      setSelected(null);
                      setError("");
                    }}
                  >
                    <ArrowLeft size={16} /> Change flight
                  </button>

                  <h3>Primary passenger</h3>
                  <p>Enter your details for this demo booking.</p>

                  <div className="form-field">
                    <label htmlFor="passenger-name">FULL NAME *</label>
                    <input
                      id="passenger-name"
                      name="name"
                      autoComplete="name"
                      value={passenger.name}
                      onChange={updatePassenger}
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="passenger-email">EMAIL ADDRESS *</label>
                    <input
                      id="passenger-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={passenger.email}
                      onChange={updatePassenger}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="passenger-phone">PHONE NUMBER *</label>
                    <input
                      id="passenger-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={passenger.phone}
                      onChange={updatePassenger}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>

                  {error && (
                    <p className="field-error" role="alert">
                      {error}
                    </p>
                  )}

                  <button
                    className="btn btn-primary booking-full-button"
                    type="submit"
                  >
                    Confirm demo booking <ArrowRight size={17} />
                  </button>

                  <p className="form-privacy">
                    No payment will be collected.
                  </p>
                </form>

                <aside className="fare-summary">
                  <h3>Fare summary</h3>

                  <div className="fare-summary-route">
                    <span>{search.from.split("(")[0].trim()}</span>
                    <Plane size={15} />
                    <span>{search.to.split("(")[0].trim()}</span>
                  </div>

                  <div className="fare-summary-row">
                    <span>Flight</span>
                    <strong>{selected.code}</strong>
                  </div>

                  <div className="fare-summary-row">
                    <span>Airline</span>
                    <strong>{selected.name}</strong>
                  </div>

                  <div className="fare-summary-row">
                    <span>Base fare × {count}</span>
                    <strong>{money(selected.price * count)}</strong>
                  </div>

                  <div className="fare-summary-row">
                    <span>Demo taxes and fees</span>
                    <strong>Included</strong>
                  </div>

                  <div className="fare-summary-total">
                    <span>Sample total</span>
                    <strong>{money(selected.total)}</strong>
                  </div>

                  <p>
                    <Clock size={15} /> {selected.duration}
                  </p>
                  <p>
                    <Luggage size={15} /> Baggage depends on the actual airline.
                  </p>
                  <p>
                    <Users size={15} /> {count} traveler
                    {count > 1 ? "s" : ""}
                  </p>
                  <p>
                    <ShieldCheck size={15} /> Demo only — no ticket or payment.
                  </p>
                </aside>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
