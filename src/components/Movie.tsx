import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Movie() {
  const [movie, setMovie] = useState<any>(null)
  const {id} = useParams()
  console.log(id);

  useEffect(()=>{
    
    async function showMovie() {


      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=cbe3b0a2fe19035c9b98fbf6fce9680e&language=en-US`);
        const data = response.data;
        setMovie(data)
        
  
        return data; // Make sure to return the data from the function
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
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
