import "./Home.css";
import { useEffect, useState } from "react";
import * as itemsService from "../services/itemsService";
import * as cohereService from "../services/cohereService";
import Card from "../components/Card";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState("");
  const [quoteLoading, setQuoteLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await itemsService.getAll();
        if (mounted) setFeatured((data || []).slice(0, 4));
      } catch (e) {
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    async function loadQuote() {
      setQuoteLoading(true);
      try {
        const text = await cohereService.generateQuote("Rick and Morty");
        if (mounted) setQuote(text);
      } catch (e) {
        if (mounted) setQuote("Wubba Lubba Dub-Dub!");
      } finally {
        if (mounted) setQuoteLoading(false);
      }
    }
    loadQuote();
    return () => (mounted = false);
  }, []);

  return (
    <section className="home">
      <div className="portal-bg" aria-hidden="true" />

      {}
      <section className="home-quote featured-quote">
        {quoteLoading ? (
          <p className="quote-loading">Rick's thought is forming...</p>
        ) : (
          <blockquote className="quote big-quote">{quote}</blockquote>
        )}
      </section>

      <section className="home-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">826</div>
            <div className="stat-label">Characters</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">126</div>
            <div className="stat-label">Locations</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">61</div>
            <div className="stat-label">Episodes</div>
          </div>
        </div>
      </section>

      <section className="endpoints">
        <h2>API endpoints</h2>
        <div className="endpoint-grid">
          {[
            {
              name: "Characters",
              description: "Get info on characters",
              endpoint: "/api/character",
              color: "#10b981",
            },
            {
              name: "Locations",
              description: "Explore locations",
              endpoint: "/api/location",
              color: "#06b6d4",
            },
            {
              name: "Episodes",
              description: "Episode data",
              endpoint: "/api/episode",
              color: "#7c3aed",
            },
          ].map((ep) => (
            <div key={ep.name} className="endpoint-card">
              <div className="endpoint-icon" style={{ background: ep.color }}>
                {ep.name[0]}
              </div>
              <div className="endpoint-body">
                <h3>{ep.name}</h3>
                <p className="muted small">{ep.description}</p>
                <code className="endpoint-path">{ep.endpoint}</code>
              </div>
              <a
                className="endpoint-cta"
                href={
                  ep.name === "Characters"
                    ? "/items"
                    : ep.name === "Locations"
                    ? "/locations"
                    : "/episodes"
                }
              >
                Explore
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="home-featured">
        <h2>Featured characters</h2>
        {loading ? (
          <p>Loading preview…</p>
        ) : (
          <div className="grid">
            {featured.map((f) => (
              <div className="card-small" key={f.id}>
                <Card item={f} />
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
