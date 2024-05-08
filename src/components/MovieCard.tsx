
import { useContext, useEffect, useState } from "react";
import SingleMovie from "./SingleMovie";
import SearchBar from "./SearchBar";
import {Context} from '../App'


const api_url_search = `https://api.themoviedb.org/3/search/movie?api_key=cbe3b0a2fe19035c9b98fbf6fce9680e&language=en-US&query=`;

const api_url = `https://api.themoviedb.org/3/discover/movie?api_key=cbe3b0a2fe19035c9b98fbf6fce9680e&sort_by=popularity.desc&page=1&with_original_language=en`;
export default function MovieCard( { page, setPage }: { page: number, setPage: any }) {

  const [movies, setMovies] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useContext<any>(Context)
  const [timer, setTimer] = useState<any>(null);
  const [searchTriggered, setSearchTriggered] = useState(false)
  const [lastSearchTerm, setLastSearchTerm] = useState(true);
  const [totalPages, setTotalPages] = useState(0);



  async function searchMovies(movie? :string) {
    let url = api_url;
    if (movie) {
      url = `${api_url_search}${movie}&page=${page}`;
    }
    
    const res = await fetch(url);
    let data = await res.json();
    console.log( data);
    
    setPage(data.page)
    setMovies(data.results);
    setTotalPages(data.total_pages); 
    console.log( page);
    console.log( totalPages);
  }
  // function EnterKey(e :any) {
  //   if (e.key === "Enter") {
  //     // searchMovies(searchTerm, page );
  //   }
  // }

  
  useEffect(() => {
    if (searchTerm.length < 3 ) {
      // If the search term is empty, make the default API request
      searchMovies('');
      setSearchTriggered(false);
    return
    } 

    if (!lastSearchTerm && searchTerm.length >= 3 ) {
        setSearchTriggered(true);
      if (timer) clearTimeout(timer);
      
      const newTimer = setTimeout(() => {
        setLastSearchTerm(true);
        searchMovies(searchTerm);
       
      }, 1500);

      setTimer(newTimer);
      return
    } else {
      // If searchTerm is the same as lastSearchTerm, fetch immediately
      searchMovies(searchTerm);
      setSearchTriggered(true);
    }
  }, [lastSearchTerm,searchTerm]);

  // useEffect(() => {
  //   // const searchMovies = async (query) => {
  //   //   // Fetch movies based on the search query
  //   //   // Implement your fetch logic here
  //   // };

  //   if (searchTerm.length < 3) {
  //     // If search term is empty, make default API request
  //     searchMovies('');
  //   } else {
  //     // If search term is not empty
  //     if (searchTerm === lastSearchTerm) {
  //       // If search term is the same as the last search term,
  //       // there's no need to wait, so fetch movies immediately
  //       searchMovies(searchTerm);
        
  //     } else {
  //       // If search term is different, debounce the fetch
  //       if (timer) clearTimeout(timer);
  //       const newTimer = setTimeout(() => {
  //         searchMovies(searchTerm);
  //         setLastSearchTerm(searchTerm); // Update lastSearchTerm after fetching
  //       }, 1500); // Debounce time
  //       setTimer(newTimer);
  //     }
  //   }
  // }, [searchTerm, lastSearchTerm]);


    // Trigger searchMovies function when page changes
useEffect(() => {

if (page !== undefined && page !== null) {
  searchMovies(searchTerm);
}
}, [page]);

  useEffect(() => {
    searchMovies()
  }, []);

// Generate an array of page numbers to display
function generatePageNumbers() {
const pageNumbers = [];

const maxPageNumbers = 6; // Maximum number of page numbers to display around the active page
const startPage = Math.max(1, page - Math.floor(maxPageNumbers / 2));
const endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);

// Display '1' and '...'
if (startPage > 1) {
  pageNumbers.push(
    <button key={1} onClick={() => setPage(1)}>
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
    <button key={i} onClick={() => setPage(i)} className={page === i ? 'active' : ''}>
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
    <button key={totalPages} onClick={() => setPage(totalPages)}>
      {totalPages}
    </button>
  );
}

return pageNumbers;
}
const handleChange = (e: any) => {
  setSearchTerm(e.target.value);
  setLastSearchTerm(false);
//   // if (timer) {
//   //   clearTimeout(timer);
//   // }
};

// Function to handle key up event

return (
  <div className="app">

    
 
    <div className="search">
      <SearchBar   onChange={handleChange}
      />
     
    </div>

    {movies?.length > 0 ? (
      <div className="container">
        {movies.map((movie : any) => (
          < SingleMovie key={movie.id} idd={movie.id}  movie = {movie}   />
        ))}{" "}
      </div>
    ) : (
      <div className="empty">
        <h2>No Movies Card</h2>
      </div>
    )}
    {searchTriggered && movies?.length > 0 &&( // Render pagination buttons only if search API is triggered
  <div className="pagination">
    <button onClick={() => setPage(page - 1)} disabled={page === 1}>
      Previous
    </button>
    {generatePageNumbers()}
    <button onClick={() => setPage(page + 1)}>Next</button>
  </div>
)}
</div>
 
);
}
