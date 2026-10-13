import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FlightSearch from "./components/FlightSearch";
import Destinations from "./components/Destinations";
import Offers from "./components/Offers";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BookingFlow from "./components/BookingFlow";
import Preloader from "./components/Preloader";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingSearch, setBookingSearch] = useState(null);

  // Show the intro animation when the website opens.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 2300);

    return () => window.clearTimeout(timer);
  }, []);

  // Reveal website sections when they enter the viewport.
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) =>
        element.classList.add("is-visible")
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  // Handle flight searches from the search component.
  function handleFlightSearch(search) {
    if (!search) return;

    setSearchQuery(
      typeof search.to === "string"
        ? search.to.split("(")[0].trim()
        : ""
    );

    setBookingSearch(search);
  }

  // Handle booking requests from destination and offer cards.
  function handlePackageBooking(destination) {
    const now = new Date();

    const today = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");

    setBookingSearch({
      from: "Bengaluru (BLR)",
      to: destination,
      departure: "",
      returnDate: "",
      travelers: "1",
      trip: "round",
      package: true,
      dateMissing: today,
    });

    // Scroll to the flight search section.
    document.getElementById("flight-search")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // Close the booking flow.
  function closeBooking() {
    setBookingSearch(null);
  }

  return (
    <>
      {/* Animated website intro */}
      {loading && (
        <Preloader onComplete={() => setLoading(false)} />
      )}

      {/* Main website */}
      <div
        className={`app-shell ${
          loading ? "app-loading" : "app-ready"
        }`}
        aria-hidden={loading ? "true" : undefined}
      >
        <Navbar />

        <main>
          <Hero />

          <FlightSearch onSearch={handleFlightSearch} />

          <Destinations
            searchQuery={searchQuery}
            onBook={handlePackageBooking}
          />

          <Offers onBook={handlePackageBooking} />

          <Services />

          <About />

          <Contact />
        </main>

        <Footer />
      </div>

      {/* Flight booking modal */}
      {bookingSearch && (
        <BookingFlow
          key={`${bookingSearch.from}-${bookingSearch.to}-${bookingSearch.departure}`}
          search={bookingSearch}
          onClose={closeBooking}
        />
      )}
    </>
  );
}