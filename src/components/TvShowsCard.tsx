import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SingleTvShow from "./SingleTVShow";
import SearchBar from "./SearchBar";
import { Context } from "../App";
import { movieUrls, tvUrls } from "./ApiUrls";
import PageNumber from "./PageNumber";


export default function TvShowsCard() {
  // const [movies, setMovies] = useState<any>([]);
  const [tvShows, setTvShows] = useState<any>([]);
  // const [page, setPage] = useState<number>(1);
  const {
    searchTerm,
    setSearchTerm,
    isMovie,
    setIsMovie,
    pageShow,
    setPageShow,
    // setTotalPages,
  } = useContext(Context);
  // const [timer, setTimer] = useState<any>(null);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [lastSearchTerm, setLastSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  async function searchTVShows(tvShow = "" ) {
    const url =
      tvShow.length < 3
        ? tvUrls.top_10_tv_shows
        : `${tvUrls.search_tv_shows}${tvShow}&page=${pageShow}`;
  
    try {
      const response = await axios.get(url);
      const data = response.data;
      setTvShows(data.results);
      // setPage(data.page);
      setTotalPages(data.total_pages);
      
      return data;
    } catch (error) {
      console.error("Error fetching TV show data:", error);
      throw error;
    }
  }



  useEffect(() => {
    if (searchTerm.length < 3) {
      // If the search term is less than 3 characters, make the default API request immediately
      // searchMovies("");
      searchTVShows("");
      setSearchTriggered(false);
      return;
    }
    // Always debounce the fetch when searchTerm changes
    const debounceFetch = setTimeout(() => {
      if (searchTerm.length >= 3) {
        setLastSearchTerm(searchTerm);
        // searchMovies(searchTerm);
        searchTVShows(searchTerm);
        setSearchTriggered(true);
      }
    }, 1500);

    // Cleanup: clear the timer if the component unmounts or if searchTerm changes
    return () => clearTimeout(debounceFetch);
  }, [searchTerm]);

  // useEffect(() => {
  //   if (searchTerm.length < 3) {
  //     // If the search term is less than 3 characters, make the default API request immediately
  //     // searchMovies("");
  //     searchTVShows("");
  //     setSearchTriggered(false);
  //     return;
  //   }
  //   // If other state variables change, trigger an immediate fetch without debounce
  //   if (searchTerm.length >= 3) {
  //     // setLastSearchTerm(searchTerm);
  //     // searchMovies(searchTerm);
  //     searchTVShows(searchTerm);
  //     setSearchTriggered(true);
  //   }
  // }, [isMovie]);

  useEffect(() => {
  //  searchMovies(searchTerm)
   searchTVShows(searchTerm)
  }, [pageShow]);
 


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
    const startPage = Math.max(1, pageShow - Math.floor(maxPageNumbers / 2));
    const endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);
    
    // Display '1' and '...'
    if (startPage > 1) {
      pageNumbers.push(
        <button key={1} onClick={() => setPageShow(1)}>
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
        <button key={i} onClick={() => setPageShow(i)} className={pageShow === i ? 'active' : ''}>
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
        <button key={totalPages} onClick={() => setPageShow(totalPages)}>
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
      {tvShows?.length > 0 ? (
        <div className="container">
          {tvShows.map((movie: any) => (
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
        tvShows?.length > 0 && ( // Render pagination buttons only if search API is triggered
        <div className="pagination">
            <button onClick={() => setPageShow(pageShow - 1)} disabled={pageShow === 1}>
              Previous
            </button>
            {generatePageNumbers()}
            <button onClick={() => setPageShow(pageShow + 1)}>Next</button>
          </div>
        )}
    </div>
  );
}
