interface Movie {
    id: number;
    title : String;
    poster_path: String
    // other properties
  }
export default function SingleMovie({ idd, movie }: { idd: number, movie: Movie  }) {
    return (
        <div>
      <div className="main-container">
    
        <img width={200} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
         <h1 className="container-movie">id :{idd}</h1>
         <h1>movie :{movie.title}</h1>
         </div>
        
        
        </div>
      )
}
