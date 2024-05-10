import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function TVShow() {
  // useNavigate to return in previous page
  const history = useNavigate();

  const [show, setShow] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    async function show() {
      try {
        // axios req to specific id tv show
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=cbe3b0a2fe19035c9b98fbf6fce9680e&language=en-US`
        );
        const data = response.data;
        setShow(data);

        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    }

    show();
  }, [id]);

  return (
    <div>
      <button onClick={() => history(-1)} className="return-btn">
        <img src="/arrow-left.jpg" alt="" /> Back to home
      </button>
      <div className="single-movie">
        {show && (
          <>
            <img
              className="img-single"
              src={
                show.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
                  : `/moviedb.jpg`
              }
              alt=""
            />
            <div>Name : {show.name}</div>
            <div>FIrst episode : : {show.first_air_date}</div>
            <div>Last episode to air : {show.first_air_date}</div>
            <div>Overview : {show.overview}</div>
          </>
        )}
      </div>
    </div>
  );
}
