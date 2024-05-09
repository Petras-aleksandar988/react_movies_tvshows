import { useContext } from "react";
import { Context } from "../App";
interface TotalPages {
  totalPages: number;
}

export default function ShowPagination({ totalPages }: TotalPages) {
  const { pageMovie, setPageMovie } = useContext(Context);
  function generatePageNumbers() {
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
        <button
          key={i}
          onClick={() => setPageMovie(i)}
          className={pageMovie === i ? "active" : ""}>
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
    <div className="pagination">
      <button
        onClick={() => setPageMovie(pageMovie - 1)}
        disabled={pageMovie === 1}>
        Previous
      </button>
      {generatePageNumbers()}
      <button onClick={() => setPageMovie(pageMovie + 1)}>Next</button>
    </div>
  );
}
