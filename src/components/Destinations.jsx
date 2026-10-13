import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Plane,
  Search,
  Sparkles,
  SlidersHorizontal,
  X,
} from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Dubai",
    country: "United Arab Emirates",
    code: "DXB",
    price: 14999,
    duration: "3 nights",
    category: "City",
    tag: "CITY ESCAPE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
    description: "Iconic skylines, desert adventures and luxury.",
  },
  {
    id: 2,
    name: "Bali",
    country: "Indonesia",
    code: "DPS",
    price: 22999,
    duration: "5 nights",
    category: "Beach",
    tag: "TROPICAL FAVOURITE",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
    description: "Discover peaceful beaches and tropical escapes.",
  },
  {
    id: 3,
    name: "Maldives",
    country: "Indian Ocean",
    code: "MLE",
    price: 28999,
    duration: "4 nights",
    category: "Beach",
    tag: "ISLAND RETREAT",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=85",
    description: "Crystal-clear waters and unforgettable island views.",
  },
  {
    id: 4,
    name: "Paris",
    country: "France",
    code: "CDG",
    price: 42999,
    duration: "5 nights",
    category: "City",
    tag: "EUROPEAN CHARM",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85",
    description: "Romantic streets, beautiful architecture and cafés.",
  },
  {
    id: 5,
    name: "Singapore",
    country: "Singapore",
    code: "SIN",
    price: 18999,
    duration: "3 nights",
    category: "City",
    tag: "URBAN ADVENTURE",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=85",
    description: "Modern attractions, gardens and vibrant city life.",
  },
  {
    id: 6,
    name: "Bangkok",
    country: "Thailand",
    code: "BKK",
    price: 16999,
    duration: "4 nights",
    category: "Culture",
    tag: "CULTURE & FOOD",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=85",
    description: "Explore lively markets, temples and local cuisine.",
  },
  {
    id: 7,
    name: "London",
    country: "United Kingdom",
    code: "LHR",
    price: 38999,
    duration: "5 nights",
    category: "Culture",
    tag: "CLASSIC GETAWAY",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=85",
    description: "Historic landmarks, riverside walks and culture.",
  },
  {
    id: 8,
    name: "Tokyo",
    country: "Japan",
    code: "HND",
    price: 35999,
    duration: "5 nights",
    category: "Adventure",
    tag: "CULTURAL DISCOVERY",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=85",
    description: "Experience neon city streets and Japanese traditions.",
  },
];

const categories = ["All", "Beach", "City", "Culture", "Adventure"];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function Destinations({
  searchQuery = "",
  onBook = () => {},
}) {
  const [query, setQuery] = useState(searchQuery);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  // Keep the internal search synchronized with the parent search.
  const [lastParentQuery, setLastParentQuery] = useState(searchQuery);
  if (searchQuery !== lastParentQuery) {
    setLastParentQuery(searchQuery);
    setQuery(searchQuery);
  }

  const normalizedQuery = query.trim().toLowerCase();

  const filteredDestinations = useMemo(() => {
    let results = destinations.filter((place) => {
      const searchableText = [
        place.name,
        place.country,
        place.code,
        place.tag,
        place.description,
        place.category,
      ].join(" ").toLowerCase();

      const matchesQuery = searchableText.includes(normalizedQuery);
      const matchesCategory =
        category === "All" || place.category === category;

      return matchesQuery && matchesCategory;
    });

    if (sort === "price-low") {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      results.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    return results;
  }, [normalizedQuery, category, sort]);

  function handleBooking(place) {
    onBook(`${place.name} (${place.code})`);
  }

  function scrollToFlights() {
    document.getElementById("flight-search")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setSort("featured");
  }

  return (
    <section className="section destinations-section" id="destinations">
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <span className="section-kicker">
              <Sparkles size={13} className="destination-heading-icon" />
              YOUR NEXT ADVENTURE AWAITS
            </span>

            <h2>
              Places worth <span>travelling for.</span>
            </h2>

            <p>
              Discover extraordinary destinations and find inspiration
              for your next unforgettable journey.
            </p>
          </div>

          <a href="#flight-search" className="text-link">
            Plan your journey <ArrowRight size={17} />
          </a>
        </div>

        <div className="destination-toolbar reveal">
          <div className="destination-search-box">
            <Search size={19} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search destinations, countries or airport codes..."
              aria-label="Search destinations"
            />
            {query && (
              <button
                type="button"
                className="destination-clear-search"
                onClick={() => setQuery("")}
                aria-label="Clear destination search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <label className="destination-sort">
            <SlidersHorizontal size={17} />
            <span className="destination-sort-label">Sort:</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort destinations"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </label>
        </div>

        <div className="destination-category-row" aria-label="Filter destinations by category">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={`destination-category ${
                category === item ? "active" : ""
              }`}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="destination-results-line" aria-live="polite">
          <span>
            <strong>{filteredDestinations.length}</strong>{" "}
            {filteredDestinations.length === 1
              ? "destination"
              : "destinations"}{" "}
            to explore
          </span>
          {(normalizedQuery || category !== "All" || sort !== "featured") && (
            <button type="button" onClick={clearFilters}>
              Reset filters <X size={14} />
            </button>
          )}
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="destination-grid">
            {filteredDestinations.map((place, index) => (
              <article
                className={`destination-card reveal reveal-delay-${
                  (index % 4) + 1
                }`}
                key={place.id}
              >
                <button
                  className="destination-image"
                  type="button"
                  style={{ backgroundImage: `url("${place.image}")` }}
                  aria-label={`Explore ${place.name}, ${place.country}`}
                  onClick={() => handleBooking(place)}
                >
                  <span className="destination-tag">{place.tag}</span>
                  <span className="destination-image-arrow">
                    <ArrowUpRight size={19} />
                  </span>
                </button>

                <div className="destination-info">
                  <div className="destination-main-info">
                    <h3>{place.name}</h3>

                    <span className="destination-country">
                      <MapPin size={13} />
                      {place.country}
                    </span>

                    <p>{place.description}</p>
                  </div>

                  <div className="destination-price">
                    <span>Package estimate from</span>
                    <strong>{formatPrice(place.price)}</strong>
                    <small>{place.duration} · per person*</small>
                  </div>
                </div>

                <button
                  type="button"
                  className="destination-book"
                  onClick={() => handleBooking(place)}
                >
                  <span>
                    Explore destination
                    <small>
                      {place.duration} · {place.code}
                    </small>
                  </span>
                  <ArrowRight size={17} />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="destination-empty">
            <span className="destination-empty-icon">
              <Plane size={28} />
            </span>
            <h3>No destinations found</h3>
            <p>
              Try another city, country or category, or reset your filters
              to see all destinations.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={clearFilters}
            >
              Show all destinations <ArrowRight size={17} />
            </button>
          </div>
        )}

        <div className="destination-bottom-cta reveal">
          <div className="destination-cta-icon">
            <Plane size={23} />
          </div>
          <div>
            <h3>Your next great story starts here.</h3>
            <p>
              Choose a destination to open your sample flight booking flow.
            </p>
          </div>
          <a href="#flight-search" className="btn btn-dark">
            Find your flight <ArrowRight size={17} />
          </a>
        </div>

        <p className="disclaimer">
          *Prices are illustrative package estimates in INR, not live flight
          fares. Actual fares, availability and package inclusions depend on
          your travel dates and booking provider.
        </p>
      </div>
    </section>
  );
}
