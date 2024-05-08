import { useState,useContext } from "react";
import {Context} from '../App'
import TvShowsCard from "./TvShowsCard";
import { usePageNumber } from "../store";
import MoviesCard from "./MoviesCard";

export default function MainComopnent() {
const page1 =  usePageNumber ((state) => state.page)

  const {  isMovie, setIsMovie } = useContext(Context);
  
const handleMovieButtonClick = () => {
    setIsMovie(true);
  };

  const handleTvShowButtonClick = () => {
    setIsMovie(false);
  };

  
  return (
    <>
     
    <h1>Search your favorite Movies and TV Shows</h1>
    <div className="toggle-buttons">
      <button className={isMovie ? 'active' : ''}  onClick={handleMovieButtonClick}>Movies </button>
      <button className={!isMovie ? 'active' : ''}  onClick={handleTvShowButtonClick}>TV Shows</button>
    </div>
    { isMovie ?   <MoviesCard/> : <TvShowsCard  /> }
    </>
  )
}
