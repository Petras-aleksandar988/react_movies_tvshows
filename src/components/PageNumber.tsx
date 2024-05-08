import {Context} from '../App'
import { useContext } from "react";


function generatePageNumbers(page: number, setPage: (page: number) => void, totalPages: number ) {


  
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

    
    export default function PageNumber({ page,totalPages,setPage }: { page: number,  totalPages: number, setPage : (page: number) => void; } ) {
      // const { page,setPage,totalPages,isMovie } = useContext(Context);
      
// const [moviePage, setMoviePage] = useState(1);
// const [tvShowPage, setTvShowPage] = useState(1);
// const [totalMoviePages, setTotalMoviePages] = useState(1);
// const [totalTvShowPages, setTotalTvShowPages] = useState(1);

// const page = isMovie ? moviePage : tvShowPage;

// const setPage = isMovie ? setMoviePage : setTvShowPage;
// const totalPages = isMovie ? totalMoviePages : totalTvShowPages;

  return (
    <div className="pagination">
    <button onClick={() => setPage(page - 1)} disabled={page === 1}>
      Previous
    </button>
    {generatePageNumbers(page, setPage, totalPages)}
    <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  )
}


