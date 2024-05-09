import { Link } from "react-router-dom";
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  name: string;
  release_date: string;
}
export default function SingleMovie({ movie }: { movie: Movie }) {
  
  return (
    <Link to={`/movie/${movie.id}`}>
    
        <div className="main-container">
        <img className="image-container"
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `./moviedb.jpg`}
            alt=""
          />
         <div className="container-movie"><strong className="subtitle">Movie :</strong> {movie.title}</div>
          <div className="container-movie"><strong className="subtitle"> Relase date : </strong> {movie.release_date}</div>
          <div className=" hover"><div> {movie.overview} </div> </div>
        </div>
     
    </Link>
  );
}
