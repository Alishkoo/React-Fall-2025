import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LocationCard from "../components/LocationCard";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import * as locationsService from "../services/locationsService";
import "./SearchPage.css";

export default function LocationsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const data = await locationsService.getAll(q);
        if (mounted) setItems(data || []);
      } catch (err) {
        setError(err.message || "Error fetching locations");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchData();
    return () => (mounted = false);
  }, [q]);

  return (
    <section>
      <div className="page-header">
        <h2>Locations</h2>
        <p className="page-subtitle">Discover locations across dimensions</p>
      </div>
      <div className="search-container">
        <div className="search-box">
          <input
            className="search-input"
            placeholder="Search locations by name..."
            value={q}
            onChange={(e) => setSearchParams({ q: e.target.value })}
          />
          {q && (
            <button
              className="clear-search"
              onClick={() => setSearchParams({})}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        {q && (
          <p className="search-results-text">
            {loading ? "Searching..." : `Search results for "${q}"`}
          </p>
        )}
      </div>

      {loading && <Spinner />}
      {error && <ErrorBox>{error}</ErrorBox>}

      {!loading && !error && (
        <>
          {items && items.length > 0 && (
            <div className="results-info">
              <span className="results-count">
                Showing {items.length} location{items.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
          <div className="list-container">
            {items && items.length > 0 ? (
              items.map((it) => <LocationCard key={it.id} item={it} />)
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">🌍</div>
                <h3>No locations found</h3>
                <p>
                  {q
                    ? `No locations match "${q}". Try a different search term.`
                    : "Start typing to search for locations across dimensions."}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
