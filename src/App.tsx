// import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import React, {  useState,createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MovieCard from "./components/MovieCard";
import Movie from './components/Movie';
import TvShowsCard from "./components/TvShowsCard";
import MainComopnent from "./components/MainComopnent";
import TVShow from "./components/TVShow";

export const Context = createContext({
  searchTerm: "",
  setSearchTerm: (term: string) => {},
  isMovie: false,
  setIsMovie: (isMovie: boolean) => {}
});

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMovie, setIsMovie] = useState(false);
  const [page, setPage] = useState(1);
  
  // Provide context value as an object
  const contextValue = {
    searchTerm,
    setSearchTerm,
    isMovie,
    setIsMovie
  };
  
  return (
    <div className="app">

      <Context.Provider value={contextValue }>

      <Router>
        <Routes>
        <Route path="/" element={ <MainComopnent/>} />
       
   
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/show/:id" element={<TVShow />} />
          {/* Add more routes if needed */}
        </Routes>
      </Router>

      </Context.Provider>
    </div>
  );
}

export default App;
