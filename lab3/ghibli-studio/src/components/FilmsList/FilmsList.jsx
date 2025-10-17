import React, { useEffect } from "react";
import FilmsCard from "../FilmsCard/FilmsCard.jsx";
import { useState, useEffect } from "react";
import "./FilmsList.css";

const FilmsList = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <>
      <button className="load-button" onClick={loadMovies}>
        Load movies of Ghibli studio
      </button>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button onClick={() => setSearch("")} className="clear-button">
          Clear
        </button>
      </div>

      <div className="films-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <FilmsCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </>
  );
};

export default FilmsList;
