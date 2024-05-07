import { Link } from "react-router-dom";
interface Movie {
    id: number;
    title : string;
    poster_path: string;
    overview: string;
    name: string;
    // other properties
  }
export default function SingleMovie({ idd, movie }: { idd: number, movie: Movie  }) {
    return (
    <Link to={`/movie/${movie.id}`}>
    
        <div>
      <div className="main-container">
    
        <img width={200} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
         <h1 className="container-movie">id :{idd}</h1>
         <h1>movie :{movie.name}</h1>
         </div>
        
        
        </div>
    </Link>
      )
}
