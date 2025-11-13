import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import * as locationsService from "../services/locationsService";

export default function LocationDetails() {
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
        const data = await locationsService.getById(id);
        if (mounted) setItem(data);
      } catch (err) {
        setError(err.message || "Error fetching location");
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
        className="location-icon"
        style={{ width: 180, height: 180, borderRadius: 8, margin: "16px 0" }}
      >
        📍
      </div>
      <ul>
        <li>
          <strong>Type:</strong> {item.type}
        </li>
        <li>
          <strong>Dimension:</strong> {item.dimension}
        </li>
        <li>
          <strong>Residents:</strong> {item.residents?.length || 0}
        </li>
        <li>
          <strong>Created:</strong>{" "}
          {new Date(item.created).toLocaleDateString()}
        </li>
      </ul>
    </section>
  );
}
