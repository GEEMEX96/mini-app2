import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.scss";

function MovieDetails() {
  const { imdbID } = useParams();
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    const fetchMovieData = async () => {
      const url = `https://www.omdbapi.com/?apikey=b33734fe&i=${imdbID}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setMovieData({});
      }
    };
    fetchMovieData();
  }, [imdbID]);

  return (
    <div className="container">
      <img src={movieData.Poster} alt={movieData.Title} className="poster" />
      <div className="info-container">
        <h1 className="movie-header">{movieData.Title}</h1>
        <p className="movie-info">Year: {movieData.Year}</p>
        <p className="movie-info">Rated: {movieData.Rated}</p>
        <p className="movie-info">Runtime: {movieData.Runtime}</p>
        <p className="movie-info">Genre: {movieData.Genre}</p>
        <p className="movie-info">Director: {movieData.Director}</p>
        <p className="movie-info">Writer: {movieData.Writer}</p>
        <p className="movie-info">Actors: {movieData.Actors}</p>
        <p className="movie-info">Plot: {movieData.Plot}</p>
      </div>
    </div>
  );
}

export default MovieDetails;
