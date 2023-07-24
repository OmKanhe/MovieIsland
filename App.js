import './App.css';
import SearchBox from './search.svg'
import MovieCard from './MovieCard';
import { useEffect, useState } from 'react';

//  7e78e7ab

const API_URL = `http://www.omdbapi.com?apikey=7e78e7ab`

const movie = {
  "Title": "The Avengers",
  "Year": "2012",
  "imdbID": "tt0848228",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
}


const App = () => {

  const [movies,setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const searchMovies =  async(title) =>{
      const response = await fetch(`${API_URL}&s=${title}`)
      const data = await response.json()
      setMovies(data.Search)
  }

  useEffect(()=>{
    searchMovies('Avengers')
  },[])
  
  return (
    <div className="app">
      <h1>MovieIsLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchBox}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
