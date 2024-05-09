import { useContext, useCallback } from "react";
import { Context } from "../App";
import TvShowsCard from "./TvShowsCard";
import MoviesCard from "./MoviesCard";
import SearchBar from "./SearchBar";

export default function MainComopnent() {
  const {
    searchTerm,
    setSearchTerm,
    isMovie,
    setIsMovie,
    setPageShow,
    setPageMovie,
  } = useContext(Context);

  const handleMovieButtonClick = () => {
    setIsMovie(true);
  };

  const handleTvShowButtonClick = () => {
    setIsMovie(false);
  };
  const handleChange = useCallback((e: any) => {
    setSearchTerm(e.target?.value);
    setPageMovie(1);
    setPageShow(1);
  }, []);

  return (
    <>
      <h1>Search your favorite Movies and TV Shows</h1>
      <div className="toggle-buttons">
        <button
          className={isMovie ? "active" : ""}
          onClick={handleMovieButtonClick}>
          Movies{" "}
        </button>
        <button
          className={!isMovie ? "active" : ""}
          onClick={handleTvShowButtonClick}>
          TV Shows
        </button>
      </div>
      <div className="search">
        <SearchBar key = 'searchBar' onChange={handleChange} searchTerm={searchTerm} />
      </div>
      {isMovie ? <MoviesCard  /> : <TvShowsCard  />}
    </>
  );
}
