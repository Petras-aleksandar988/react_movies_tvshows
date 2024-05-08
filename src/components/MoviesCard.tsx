import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SingleTvShow from "./SingleTVShow";
import SearchBar from "./SearchBar";
import { Context } from "../App";
import { movieUrls, tvUrls } from "./ApiUrls";
// import PageNumber from "./PageNumber";

// const api_url_search_tv = `https://api.themoviedb.org/3/search/tv?api_key=cbe3b0a2fe19035c9b98fbf6fce9680e&language=en-US&query=`;

// const api_url_tv = `https://api.themoviedb.org/3/discover/tv?api_key=cbe3b0a2fe19035c9b98fbf6fce9680e&sort_by=popularity.desc&page=1&with_original_language=en`;

// const api_url_search = `https://api.themoviedb.org/3/search/movie?api_key=cbe3b0a2fe19035c9b98fbf6fce9680e&language=en-US&query=`;

// const api_url = `https://api.themoviedb.org/3/discover/movie?api_key=cbe3b0a2fe19035c9b98fbf6fce9680e&sort_by=popularity.desc&page=1&with_original_language=en`;

export default function MoviesCard() {
  const [movies, setMovies] = useState<any>([]);
//   const [pageMovie, setPageMovie] = useState<any>(1);
  const {
    searchTerm,
    setSearchTerm,
    isMovie,
    // setIsMovie,
    pageMovie,
    setPageMovie,
    // setTotalPages,
  } = useContext(Context);
  const [timer, setTimer] = useState<any>(null);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [lastSearchTerm, setLastSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // async function searchMovies(movie = "") {
  //   let url = "";

  //   if (isMovie) {
  //     url =
  //       searchTerm.length < 3
  //         ? movieUrls.top_10_movies
  //         : `${movieUrls.search_movies}${movie}&page=${page}`;
  //   } else {
  //     url =
  //       searchTerm.length < 3
  //         ? tvUrls.top_10_tv_shows
  //         : `${tvUrls.search_tv_shows}${movie}&page=${page}`;
  //   }

  //   try {
  //     const response = await axios.get(url);
  //     const data = response.data;

  //     // setPage(data.page);
  //     setMovies(data.results);
  //     setTotalPages(data.total_pages);
  //     console.log(page);

  //     return data; // Make sure to return the data from the function
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     throw error;
  //   }
  // }

  async function searchMovies(movie = "") {
    const url =
      movie.length < 3
        ? movieUrls.top_10_movies
        : `${movieUrls.search_movies}${movie}&page=${pageMovie}`;
  
    try {
      const response = await axios.get(url);
      const data = response.data;
    //   setPageMovie(data.page)
      setMovies(data.results);
      setTotalPages(data.total_pages);
     
      return data;

    } catch (error) {
      console.error("Error fetching movie data:", error);
      throw error;
    }
  }
  


  useEffect(() => {
    if (searchTerm.length < 3) {
      // If the search term is less than 3 characters, make the default API request immediately
      // searchMovies("");
      searchMovies("");
      setSearchTriggered(false);
      return;
    }
    // Always debounce the fetch when searchTerm changes
    const debounceFetch = setTimeout(() => {
      if (searchTerm.length >= 3) {
        setLastSearchTerm(searchTerm);
        // searchMovies(searchTerm);
        searchMovies(searchTerm);
        setSearchTriggered(true);
      }
    }, 1500);

    // Cleanup: clear the timer if the component unmounts or if searchTerm changes
    return () => clearTimeout(debounceFetch);
  }, [searchTerm]);

//   useEffect(() => {
//     if (searchTerm.length < 3) {
//       // If the search term is less than 3 characters, make the default API request immediately
//       // searchMovies("");
//       searchMovies("");
//       setSearchTriggered(false);
//       return;
//     }
//     // If other state variables change, trigger an immediate fetch without debounce
//     if (searchTerm.length >= 3) {
//       setLastSearchTerm(searchTerm);
//       // searchMovies(searchTerm);
//       searchMovies(searchTerm);
//       setSearchTriggered(true);
//     }
//   }, [isMovie]);

  useEffect(() => {
  //  searchMovies(searchTerm)
   searchMovies(searchTerm)
  }, [pageMovie]);
 
  
  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
    // setLastSearchTerm(searchTerm);
    // if (timer) {
    //   clearTimeout(timer);
    // }
  };
  function generatePageNumbers( ) {


  
    const pageNumbers = [];
    const maxPageNumbers = 6; // Maximum number of page numbers to display around the active page
    const startPage = Math.max(1, pageMovie - Math.floor(maxPageNumbers / 2));
    const endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);
    
    // Display '1' and '...'
    if (startPage > 1) {
      pageNumbers.push(
        <button key={1} onClick={() => setPageMovie(1)}>
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsis-start">...</span>);
      }
    }
    
    // Display the page numbers around the active page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => setPageMovie(i)} className={pageMovie === i ? 'active' : ''}>
          {i}
        </button>
      );
    }
    
    // Display '...' and the last page number
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsis-end">...</span>);
      }
      pageNumbers.push(
        <button key={totalPages} onClick={() => setPageMovie(totalPages)}>
          {totalPages}
        </button>
      );
    }
    
    return pageNumbers;
    }

  return (
    <div className="app">
      <div className="title">
        {isMovie ? <h1>Movies</h1> : <h1>TV Shows</h1>}
      </div>
      <div className="search">
        <SearchBar onChange={handleChange} />
      </div>
      {isLoading && <h1>loading....</h1>}
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie: any) => (
            <SingleTvShow
              key={movie.id}
              idd={movie.id}
              movie={movie}
              isMovie={isMovie}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Card</h2>
        </div>
      )}


      {searchTriggered &&
        movies?.length > 0 && ( // Render pagination buttons only if search API is triggered
          <div className="pagination">
            <button onClick={() => setPageMovie(pageMovie - 1)} disabled={pageMovie === 1}>
              Previous
            </button>
            {generatePageNumbers()}
            <button onClick={() => setPageMovie(pageMovie + 1)}>Next</button>
          </div>
        //   <PageNumber page ={page}  setPage={setPage}  totalPages = {totalPages}/>
        )}
    </div>
  );
}