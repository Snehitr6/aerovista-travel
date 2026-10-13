import { useMemo, useState } from "react";
import {
  ArrowRight,
  Plane,
  Hotel,
  Compass,
  Sparkles,
  Check,
  Clock,
  Star,
  MapPin,
  SlidersHorizontal,
} from "lucide-react";

const packages = [
  {
    id: "bali",
    badge: "MOST LOVED",
    category: "Beach",
    label: "ISLAND ESCAPE",
    title: "Bali Bliss",
    destination: "Bali (DPS)",
    country: "Indonesia",
    subtitle: "A tropical escape filled with sunsets.",
    duration: "5 days · 4 nights",
    price: 24999,
    oldPrice: 29999,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85",
    features: ["Hotel stay", "Airport transfers", "Sightseeing"],
  },
  {
    id: "dubai",
    badge: "CITY SPECIAL",
    category: "City",
    label: "LUXURY CITY BREAK",
    title: "Dubai Discovery",
    destination: "Dubai (DXB)",
    country: "United Arab Emirates",
    subtitle: "Iconic skylines, golden dunes and more.",
    duration: "4 days · 3 nights",
    price: 32999,
    oldPrice: 38999,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=85",
    features: ["Hotel stay", "City tour", "Desert safari"],
  },
  {
    id: "maldives",
    badge: "ROMANTIC GETAWAY",
    category: "Beach",
    label: "ISLAND RETREAT",
    title: "Maldives Moments",
    destination: "Maldives (MLE)",
    country: "Maldives",
    subtitle: "Unwind in turquoise waters and island calm.",
    duration: "4 days · 3 nights",
    price: 38999,
    oldPrice: 45999,
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=85",
    features: ["Resort stay", "Island transfer", "Breakfast"],
  },
];

const categories = ["All Packages", "Beach", "City"];

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function Offers({ onBook = () => {} }) {
  const [category, setCategory] = useState("All Packages");
  const [sort, setSort] = useState("featured");

  const visiblePackages = useMemo(() => {
    let result = packages.filter(
      (item) => category === "All Packages" || item.category === category
    );

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [category, sort]);

  return (
    <section className="section offers-section" id="packages">
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <span className="section-kicker">
              <Sparkles size={13} className="offer-kicker-icon" />
              CURATED FOR YOUR NEXT ESCAPE
            </span>

            <h2>
              Travel beautifully. <span>Spend thoughtfully.</span>
            </h2>

            <p>
              Discover thoughtfully designed sample itineraries for
              memorable journeys.
            </p>
          </div>

          <div className="offer-heading-note">
            <Sparkles size={18} />
            <span>Made for your next story</span>
          </div>
        </div>

        <div className="offer-toolbar reveal">
          <div className="offer-filters" aria-label="Filter travel packages">
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                className={`offer-filter ${
                  category === item ? "active" : ""
                }`}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="offer-sort">
            <SlidersHorizontal size={16} />
            <span>Sort by</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort packages by price"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>

        <div className="offer-count" aria-live="polite">
          Showing <strong>{visiblePackages.length}</strong>{" "}
          {visiblePackages.length === 1 ? "package" : "packages"}
        </div>

        <div className="package-grid">
          {visiblePackages.map((item, index) => {
            const discount = Math.round(
              ((item.oldPrice - item.price) / item.oldPrice) * 100
            );

            return (
              <article
                className={`package-card reveal reveal-delay-${index + 1}`}
                key={item.id}
              >
                <div
                  className="package-image"
                  style={{ backgroundImage: `url("${item.image}")` }}
                  role="img"
                  aria-label={`${item.title} travel package in ${item.country}`}
                >
                  <span className="package-badge">
                    <Star size={12} fill="currentColor" />
                    {item.badge}
                  </span>

                  <span className="package-discount">
                    {discount}% OFF
                  </span>

                  <span className="package-category">{item.label}</span>
                </div>

                <div className="package-body">
                  <div className="package-title-row">
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                    </div>

                    <span className="package-rating">
                      <MapPin size={13} />
                      {item.country}
                    </span>
                  </div>

                  <div className="package-duration">
                    <Clock size={15} />
                    {item.duration}
                  </div>

                  <div className="package-features">
                    {item.features.map((feature, i) => (
                      <span key={feature}>
                        {i === 0 ? (
                          <Hotel size={15} />
                        ) : i === 1 ? (
                          <Plane size={15} />
                        ) : (
                          <Compass size={15} />
                        )}
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="package-bottom">
                    <div className="package-price-block">
                      <small>Estimated price per person</small>
                      <div className="package-price-values">
                        <strong>{money(item.price)}</strong>
                        <del>{money(item.oldPrice)}</del>
                      </div>
                      <small>Sample package pricing</small>
                    </div>

                    <button
                      className="package-button"
                      type="button"
                      onClick={() => onBook(item.destination)}
                      aria-label={`Book ${item.title}`}
                    >
                      Book trip <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="package-note">
          <Check size={17} />
          <p>
            These are illustrative package prices and discounts for this
            demo, not verified live offers. Confirm actual availability,
            inclusions and final pricing with a booking provider.
          </p>
        </div>

        <div className="offer-bottom-cta reveal">
          <div className="offer-cta-icon">
            <Plane size={23} />
          </div>

          <div>
            <h3>Your next getaway is waiting.</h3>
            <p>Choose a package to continue to the sample booking flow.</p>
          </div>

          <a href="#flight-search" className="btn btn-dark">
            Search flights <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
