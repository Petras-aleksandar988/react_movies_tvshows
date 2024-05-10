import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SingleMovie from "./SingleMovie";
import MoviePagination from "./MoviePagination";
import { Context } from "../App";
import { movieUrls } from "./ApiUrls";
const api_key = process.env.REACT_APP_API_KEY
export default function MoviesCard() {
  
  const {
    searchTerm,
    pageMovie,
  } = useContext(Context);
  const [movies, setMovies] = useState<any>([]);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function searchMovies(movie :any) {
    const url =
      movie.length < 3
        ? movieUrls.top_10_movies
        : `${movieUrls.search_movies}${movie}&page=${pageMovie}`;

    try {
      setIsLoading(true);
      const response = await axios.get(url);
      let data = response.data;
      let top10Movies = data.results.slice(0, 10);
      setMovies(top10Movies);
      setTotalPages(data.total_pages);
      setIsLoading(true);
      return data;
    } catch (error) {
      console.error("Error fetching movie data:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (searchTerm.length < 3) {
      searchMovies("");
      setSearchTriggered(false);
      return;
    }

    const debounceFetch = setTimeout(() => {
      if (searchTerm.length >= 3) {
        searchMovies(searchTerm);
        setSearchTriggered(true);
      }
    }, 1000);

    return () => clearTimeout(debounceFetch);
  }, [searchTerm]);

  useEffect(() => {
    searchMovies(searchTerm);
  }, [pageMovie]);

  return (
    <div className="app">
      {movies?.length > 0 && searchTerm.length < 3 ? (
        <div className="title">
          <h1>Top 10 Movies</h1>
        </div>
      ) : movies?.length > 0 && searchTerm.length >= 3 ? (
        <div className="title">
          <h1>Movies</h1>
        </div>
      ) : (
        <div className="title" key="noResults">
          <h1>No Movies... try search again</h1>
        </div>
      )}

      {isLoading && <h1>loading....</h1>}
      {movies?.length > 0 && (
        <div className="container">
          {movies.map((movie: any) => 
            <div className="movie" key={movie.id}>
              <SingleMovie  movie={movie} />
            </div>
          )}
        </div>
      )}

      {searchTriggered && movies?.length > 0 && totalPages >= 2 && (
        <MoviePagination totalPages={totalPages} />
      )}
    </div>
  );
}
