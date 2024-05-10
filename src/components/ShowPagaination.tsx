import {useContext}from 'react'
import { Context } from "../App";
interface TotalPages {
    totalPages: number;
  }
  
  export default function ShowPagination({ totalPages }: TotalPages) {
    const { pageShow, setPageShow } = useContext(Context);
    function generatePageNumbers() {
        const pageNumbers = [];
        const maxPageNumbers = 4;
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
            <button
              key={i}
              onClick={() => setPageShow(i)}
              className={pageShow === i ? "active" : ""}>
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
   <div className="pagination">
          <button className='previous-next-btn'
            onClick={() => setPageShow(pageShow - 1)}
            disabled={pageShow === 1}>
            {'<'}
          </button>
          {generatePageNumbers()}
          <button className='previous-next-btn' onClick={() => setPageShow(pageShow + 1)}  disabled={pageShow === totalPages}> {'>'}</button>
        </div>
  )
}
