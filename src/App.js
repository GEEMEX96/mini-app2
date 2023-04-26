import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import MovieDetails from './MovieDetails';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      const url = `https://www.omdbapi.com/?apikey=b33734fe&s=${searchTerm}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSearchResults(data.Search || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <Router>
      <div>
        <div className="search-bar">
          <label htmlFor="searchTerm">Enter search term:</label>
          <input
            type="text"
            id="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Go</button>
        </div>
        <Routes>
          <Route
            path="/movies/:imdbID"
            element={<MovieDetails />}
          />
          <Route path="/" element={(
            <div className="movie-list">
              {searchResults.map((result) => (
                <a key={result.imdbID} href={`/movies/${result.imdbID}`} className="movie-block">
                  <img src={result.Poster} alt={result.Title} />
                  <p>{result.Title}</p>
                </a>
              ))}
            </div>
          )} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
