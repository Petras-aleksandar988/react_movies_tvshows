import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Movie() {
  const history = useNavigate();
  const [movie, setMovie] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    async function showMovie() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=cbe3b0a2fe19035c9b98fbf6fce9680e&language=en-US`
        );
        const data = response.data;
        setMovie(data);
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    }

    showMovie();
  }, [id]);

  return (
    <div>
      <button onClick={() => history(-1)} className="return-btn">
        <img src="/arrow-left.jpg" alt="" /> Back to home
      </button>
      <div className="single-movie">
        {movie && (
          <>
            <img
              className="img-single"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : `/moviedb.jpg`
              }
              alt=""
            />
            <div>Name : {movie.title}</div>
            <div>IMDB : : {movie.vote_average}</div>
            <div>Runtime : {movie.runtime} min</div>
            <div>Overview : {movie.overview}</div>
          </>
        )}
      </div>
    </div>
  );
}
