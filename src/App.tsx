// import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MovieCard from "./components/MovieCard";





function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<MovieCard />} />
          {/* Add more routes if needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
