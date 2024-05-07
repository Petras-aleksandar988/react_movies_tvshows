import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

export default function Movie() {
  const [movie, setMovie] = useState<any>(null)
  const {id} = useParams()
  console.log(id);

  useEffect(()=>{
    
    async function showMovie() {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=cbe3b0a2fe19035c9b98fbf6fce9680e&language=en-US`);
    let data = await res.json();
    console.log(data);
    setMovie(data)
    
    }
    showMovie()
  }, [id])
  return (
    <div>
    Movie: {`${id}`}
    {movie && (
      <>
        {movie.title}
        <img width={200} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
      </>
    )}
  </div>
  )
}
