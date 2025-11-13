import { Link } from "react-router-dom";
import "./Card.css";

export default function EpisodeCard({ item }) {
  if (!item) return null;
  return (
    <div className="list-item">
      <div className="list-item-content">
        <h3 className="list-item-title">{item.name}</h3>
        <p className="list-item-meta">
          {item.episode} • {new Date(item.air_date).toLocaleDateString()} •{" "}
          {item.characters?.length || 0} characters
        </p>
      </div>
      <Link to={`/episodes/${item.id}`} className="list-item-link">
        View Details →
      </Link>
    </div>
  );
}
