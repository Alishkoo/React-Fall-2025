import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import * as itemsService from "../services/itemsService";
import "./SearchPage.css";

export default function SomethingList() {
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
        const data = await itemsService.getAll(q);
        if (mounted) setItems(data || []);
      } catch (err) {
        setError(err.message || "Error fetching items");
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
        <h2>Characters</h2>
        <p className="page-subtitle">
          Explore all characters from the Rick and Morty universe
        </p>
      </div>
      <div className="search-container">
        <div className="search-box">
          <input
            className="search-input"
            placeholder="Search characters by name..."
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
                Showing {items.length} character{items.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
              gap: 18,
            }}
          >
            {items && items.length > 0 ? (
              items.map((it) => <Card key={it.id} item={it} />)
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">🚀</div>
                <h3>No characters found</h3>
                <p>
                  {q
                    ? `No characters match "${q}". Try a different search term.`
                    : "Start typing to search for characters from the Rick and Morty universe."}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
