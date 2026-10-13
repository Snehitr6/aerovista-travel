
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpDown,
  Clock3,
  Plane,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import flights from "../data/flights";

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function FlightResults({
  from = "BLR",
  to = "DXB",
  date = "",
  travelers = 1,
  onSelectFlight,
  onBack,
}) {
  const [sort, setSort] = useState("recommended");
  const [stops, setStops] = useState("all");
  const [maxPrice, setMaxPrice] = useState(60000);
  const [airline, setAirline] = useState("all");

  const availableFlights = useMemo(() => {
    let result = flights.filter(
      (flight) => flight.from === from && flight.to === to
    );

    if (stops !== "all") {
      result = result.filter(
        (flight) => String(flight.stops) === stops
      );
    }

    if (airline !== "all") {
      result = result.filter(
        (flight) => flight.airline === airline
      );
    }

    result = result.filter(
      (flight) => flight.price <= maxPrice
    );

    return [...result].sort((a, b) => {
      if (sort === "price") return a.price - b.price;
      if (sort === "duration") return a.duration - b.duration;
      if (sort === "departure") {
        return a.departure.localeCompare(b.departure);
      }

      return Number(b.popular) - Number(a.popular) ||
        a.price - b.price;
    });
  }, [from, to, stops, maxPrice, airline, sort]);

  const airlines = [
    ...new Set(
      flights
        .filter((flight) => flight.from === from && flight.to === to)
        .map((flight) => flight.airline)
    ),
  ];

  return (
    <section className="flight-results-section">
      <div className="flight-results-heading">
        <div>
          <span className="section-kicker">YOUR NEXT JOURNEY</span>
          <h2>Choose your flight.</h2>
          <p>
            Compare sample fares, departure times, and journey durations.
          </p>
        </div>

        {onBack && (
          <button className="results-back" onClick={onBack}>
            Back to search
          </button>
        )}
      </div>

      <div className="results-route">
        <div>
          <small>FROM</small>
          <strong>{from}</strong>
        </div>

        <ArrowRight size={22} />

        <div>
          <small>TO</small>
          <strong>{to}</strong>
        </div>

        <div>
          <small>TRAVELERS</small>
          <strong>
            {travelers} {travelers === 1 ? "traveler" : "travelers"}
          </strong>
        </div>

        {date && (
          <div>
            <small>DEPARTURE</small>
            <strong>{date}</strong>
          </div>
        )}
      </div>

      <div className="results-layout">
        <aside className="results-filters">
          <h3>
            <SlidersHorizontal size={17} />
            Filters
          </h3>

          <label htmlFor="flight-stops">Stops</label>
          <select
            id="flight-stops"
            value={stops}
            onChange={(event) => setStops(event.target.value)}
          >
            <option value="all">Any number of stops</option>
            <option value="0">Non-stop</option>
            <option value="1">One stop</option>
          </select>

          <label htmlFor="flight-airline">Airline</label>
          <select
            id="flight-airline"
            value={airline}
            onChange={(event) => setAirline(event.target.value)}
          >
            <option value="all">All airlines</option>
            {airlines.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          <label htmlFor="flight-price">
            Maximum fare: {money(maxPrice)}
          </label>
          <input
            id="flight-price"
            type="range"
            min="10000"
            max="60000"
            step="1000"
            value={maxPrice}
            onChange={(event) =>
              setMaxPrice(Number(event.target.value))
            }
          />

          <button
            className="results-reset"
            onClick={() => {
              setStops("all");
              setAirline("all");
              setMaxPrice(60000);
              setSort("recommended");
            }}
          >
            Reset filters
          </button>
        </aside>

        <div className="results-main">
          <div className="results-toolbar">
            <div>
              <strong>{availableFlights.length} flights found</strong>
              <span> Sample fares per traveler</span>
            </div>

            <label className="results-sort">
              <ArrowUpDown size={15} />
              <select
                aria-label="Sort flights"
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

          {availableFlights.length === 0 ? (
            <div className="results-empty">
              <Plane size={32} />
              <h3>No matching sample flights</h3>
              <p>
                Try another route or reset your filters.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setStops("all");
                  setAirline("all");
                  setMaxPrice(60000);
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="flight-results-list">
              {availableFlights.map((flight) => (
                <article
                  className="result-flight-card"
                  key={flight.id}
                >
                  {flight.popular && (
                    <span className="popular-flight-label">
                      POPULAR
                    </span>
                  )}

                  <div className="result-airline">
                    <span className="airline-symbol">
                      <Plane size={20} />
                    </span>
                    <div>
                      <strong>{flight.airline}</strong>
                      <small>{flight.code}</small>
                      <small>{flight.baggage} checked baggage</small>
                    </div>
                  </div>

                  <div className="result-timing">
                    <div>
                      <strong>{flight.departure}</strong>
                      <small>{flight.from}</small>
                    </div>

                    <div className="result-duration">
                      <span>
                        {Math.floor(flight.duration)}h{" "}
                        {Math.round((flight.duration % 1) * 60)}m
                      </span>
                      <div className="duration-line" />
                      <small>
                        {flight.stops === 0
                          ? "Non-stop"
                          : `${flight.stops} stop`}
                      </small>
                    </div>

                    <div>
                      <strong>{flight.arrival}</strong>
                      <small>{flight.to}</small>
                    </div>
                  </div>

                  <div className="result-fare">
                    <strong>{money(flight.price)}</strong>
                    <small>per traveler · sample fare</small>

                    <button
                      className="btn btn-primary"
                      onClick={() => onSelectFlight?.(flight)}
                    >
                      Select flight <ArrowRight size={15} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          <p className="results-disclaimer">
            <ShieldCheck size={15} />
            Demo data only. No live inventory or actual booking is
            provided by these sample results.
          </p>
        </div>
      </div>
    </section>
  );
}
