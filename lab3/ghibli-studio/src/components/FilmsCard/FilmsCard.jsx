import React from "react";
import "./FilmsCard.css";

const FilmsCard = ({ movie }) => {
  return (
    <div className="film-card">
      <img src={movie.image} alt={movie.title} className="film-image" />
      <h3 className="film-title">{movie.title}</h3>
      <p className="film-year">Year: {movie.release_date}</p>
      <p className="film-description">{movie.description}</p>
    </div>
  );
};

export default FilmsCard;
