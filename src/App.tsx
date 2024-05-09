import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainComopnent from "./components/MainComopnent";
import Movie from "./components/Movie";
import TVShow from "./components/TVShow";

export const Context = createContext({
  searchTerm: "",
  setSearchTerm: (term: string) => {},
  isMovie: false,
  setIsMovie: (isMovie: boolean) => {},
  pageShow: 1,
  setPageShow: (term: number) => {},
  pageMovie: 1,
  setPageMovie: (term: number) => {},
});

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMovie, setIsMovie] = useState(false);
  const [pageShow, setPageShow] = useState(1);
  const [pageMovie, setPageMovie] = useState(1);

  const contextValue = {
    searchTerm,
    setSearchTerm,
    isMovie,
    setIsMovie,
    pageShow,
    setPageShow,
    pageMovie,
    setPageMovie,
  };

  return (
    <div className="app">
      <Context.Provider value={contextValue}>
        <Router>
          <Routes>
            <Route path="/" element={<MainComopnent />} />

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
