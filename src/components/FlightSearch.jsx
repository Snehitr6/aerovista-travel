
import { useState } from "react";
import {
  PlaneTakeoff, PlaneLanding, CalendarDays,
  Users, Search, ArrowLeftRight
} from "lucide-react";

export default function FlightSearch({ onSearch }) {
  const [trip, setTrip] = useState("round");
  const [from, setFrom] = useState("Bengaluru (BLR)");
  const [to, setTo] = useState("Dubai (DXB)");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travelers, setTravelers] = useState("1");

  const today = new Date().toLocaleDateString("en-CA");

  function swapCities() {
    setFrom(to);
    setTo(from);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!from.trim() || !to.trim()) {
      window.alert("Please enter your departure and destination.");
      return;
    }

    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      window.alert("Departure and destination must be different.");
      return;
    }

    if (!departure || departure < today) {
      window.alert("Please select a valid departure date.");
      return;
    }

    if (trip === "round" && (!returnDate || returnDate < departure)) {
      window.alert("Please select a return date on or after departure.");
      return;
    }

    onSearch({
      from,
      to,
      departure,
      returnDate: trip === "round" ? returnDate : "",
      travelers,
      trip,
    });
  }

  return (
    <section className="flight-section" id="flight-search">
      <div className="container">
        <div className="flight-card reveal">
          <div className="flight-heading">
            <div>
              <span className="section-kicker">LET'S GET YOU THERE</span>
              <h2>Find your next flight.</h2>
            </div>
            <span className="flight-heading-icon"><PlaneTakeoff size={24} /></span>
          </div>

          <div className="trip-tabs">
            <button
              type="button"
              className={trip === "round" ? "trip-tab selected" : "trip-tab"}
              onClick={() => setTrip("round")}
            >
              Round trip
            </button>
            <button
              type="button"
              className={trip === "oneway" ? "trip-tab selected" : "trip-tab"}
              onClick={() => setTrip("oneway")}
            >
              One way
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flight-fields">
              <div className="field-group location-field">
                <label htmlFor="from">FROM</label>
                <div className="field-input">
                  <PlaneTakeoff size={19} />
                  <input
                    id="from"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="Departure city"
                    required
                  />
                </div>
              </div>

              <button
                type="button"
                className="swap-button"
                onClick={swapCities}
                aria-label="Swap departure and destination"
              >
                <ArrowLeftRight size={19} />
              </button>

              <div className="field-group location-field">
                <label htmlFor="to">TO</label>
                <div className="field-input">
                  <PlaneLanding size={19} />
                  <input
                    id="to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Destination city"
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="departure">DEPARTURE</label>
                <div className="field-input">
                  <CalendarDays size={19} />
                  <input
                    id="departure"
                    type="date"
                    min={today}
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    required
                  />
                </div>
              </div>

              {trip === "round" && (
                <div className="field-group">
                  <label htmlFor="return">RETURN</label>
                  <div className="field-input">
                    <CalendarDays size={19} />
                    <input
                      id="return"
                      type="date"
                      min={departure || today}
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="field-group traveler-field">
                <label htmlFor="travelers">TRAVELERS</label>
                <div className="field-input">
                  <Users size={19} />
                  <select
                    id="travelers"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Traveler" : "Travelers"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flight-submit-row">
              <p>Compare destinations and discover your next adventure.</p>
              <button type="submit" className="btn btn-dark">
                <Search size={18} /> Search flights
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
