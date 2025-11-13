import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ item }) {
  if (!item) return null;
  return (
    <article className="card">
      <img className="card-img" src={item.image} alt={item.name} />
      <div className="card-body">
        <h3>{item.name}</h3>
        <p className="muted">
          {item.species} — {item.status}
        </p>
        <Link to={`/items/${item.id}`} className="details-link">
          Details
        </Link>
      </div>
    </article>
  );
}
