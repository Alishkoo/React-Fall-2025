import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import * as episodesService from "../services/episodesService";

export default function EpisodeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await episodesService.getById(id);
        if (mounted) setItem(data);
      } catch (err) {
        setError(err.message || "Error fetching episode");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <ErrorBox>{error}</ErrorBox>;
  if (!item) return <p>Not found</p>;

  return (
    <section>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>{item.name}</h2>
      <div
        className="episode-icon"
        style={{ width: 180, height: 180, borderRadius: 8, margin: "16px 0" }}
      >
        📺
      </div>
      <ul>
        <li>
          <strong>Episode:</strong> {item.episode}
        </li>
        <li>
          <strong>Air Date:</strong> {item.air_date}
        </li>
        <li>
          <strong>Characters:</strong> {item.characters?.length || 0}
        </li>
        <li>
          <strong>Created:</strong>{" "}
          {new Date(item.created).toLocaleDateString()}
        </li>
      </ul>
    </section>
  );
}
