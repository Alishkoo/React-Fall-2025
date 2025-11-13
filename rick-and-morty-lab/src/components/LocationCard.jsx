import { Link } from "react-router-dom";
import "./Card.css";

export default function LocationCard({ item }) {
  if (!item) return null;
  return (
    <div className="list-item">
      <div className="list-item-content">
        <h3 className="list-item-title">{item.name}</h3>
        <p className="list-item-meta">
          {item.type} • {item.dimension} • {item.residents?.length || 0}{" "}
          residents
        </p>
      </div>
      <Link to={`/locations/${item.id}`} className="list-item-link">
        View Details →
      </Link>
    </div>
  );
}
