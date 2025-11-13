import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import * as itemsService from "../services/itemsService";

export default function SomethingDetails() {
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
        const data = await itemsService.getById(id);
        if (mounted) setItem(data);
      } catch (err) {
        setError(err.message || "Error fetching item");
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
      <img src={item.image} alt={item.name} style={{ width: 180, borderRadius: 8 }} />
      <ul>
        <li><strong>Status:</strong> {item.status}</li>
        <li><strong>Species:</strong> {item.species}</li>
        <li><strong>Type:</strong> {item.type || "—"}</li>
        <li><strong>Gender:</strong> {item.gender}</li>
        <li><strong>Origin:</strong> {item.origin?.name}</li>
        <li><strong>Location:</strong> {item.location?.name}</li>
        <li><strong>Episode count:</strong> {item.episode?.length || 0}</li>
      </ul>
    </section>
  );
}
