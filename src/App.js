import { useState, useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg';
import Cards from "./Cards";


const API_URL = 'http://www.omdbapi.com/?apikey=cb516274'



function App() {
  const [movies, setMovies] = useState([]);
  const [searchT, setSearchT] = useState(" ");

  const SearchForMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    SearchForMovies('The Avengers')
  }, []);

  return (
    <div className="app">
      <h1>CosMos</h1>
      <div className="search">
        <input
          placeholder="Search for any Movies"
          value={searchT}
          onChange={(e) => setSearchT(e.target.value)}
        />
        <img src={SearchIcon}
          alt="search"
          onClick={() => SearchForMovies(searchT)} />
      </div>

      {
        movies?.length > 0
          ? (
            <div className="container">
              {movies.map((movie) => (
                <Cards movie={movie} />
              ))}
            </div>

          ) : (
            <div className="empty">
              <h2> No Movies Found</h2>
            </div>
          )

      }
    </div>

  );
}

export default App;
