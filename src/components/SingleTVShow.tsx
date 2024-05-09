import { Link } from "react-router-dom";
interface Show {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  name: string;
  first_air_date: string;
}
export default function SingleTVShow({ show }: { show: Show }) {
  return (
    <Link to={`/show/${show.id}`}>
      <div className="main-container">
        <img
          className="image-container"
          src={
            show.poster_path
              ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
              : `./moviedb.jpg`
          }
          alt=""
        />
        <div className="container-movie">
          <strong className="subtitle">TV Show :</strong> {show.name}
        </div>
        <div className="container-movie">
          <strong className="subtitle"> Relase date : </strong>{" "}
          {show.first_air_date}
        </div>
        <div className=" hover">
          <div> {show.overview} </div>{" "}
        </div>
      </div>
    </Link>
  );
}
