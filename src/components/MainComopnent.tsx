import { useState,useContext } from "react";
import {Context} from '../App'
// import MovieCard from "./MovieCard";
import TvShowsCard from "./TvShowsCard";






export default function MainComopnent() {
  const {  isMovie, setIsMovie } = useContext(Context);
const [page, setPage] = useState(1);
  console.log('is movieeeeeeee', isMovie);
  
const handleMovieButtonClick = () => {
    setIsMovie(true);
  };

  const handleTvShowButtonClick = () => {
    setIsMovie(false);
  };
  return (
    <>
    
    <h1>MovieLand</h1>
    <div className="toggle-buttons">
      <button onClick={handleMovieButtonClick}>Movies</button>
      <button onClick={handleTvShowButtonClick}>TV Shows</button>
    </div>
    { <TvShowsCard  page={page} setPage={setPage} />}
    </>
  )
}
