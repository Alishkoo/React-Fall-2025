import React from "react";
import FilmsCard from "../FilmsCard/FilmsCard.jsx";
import { useState } from "react";
import "./FilmsList.css";

const FilmsList = () => {
  const [movies, setMovies] = useState([]);

  const loadMovies = async () => {
    try {
      const response = await fetch("https://ghibliapi.vercel.app/films");
      const data = await response.json();
      setMovies(data);
      console.log(data);
    } catch (err) {
      console.log("Error in List" + err);
    }
  };

  return (
    <>
      <button className="load-button" onClick={loadMovies}>
        Load movies of Ghibli studio
      </button>
      <div className="films-list">
        {movies.length > 0 &&
          movies.map((movie) => <FilmsCard key={movie.id} movie={movie} />)}
      </div>
    </>
  );
};

export default FilmsList;
