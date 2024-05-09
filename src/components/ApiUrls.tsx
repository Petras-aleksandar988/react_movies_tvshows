const api_key = process.env.REACT_APP_API_KEY

export const movieUrls = {
    top_10_movies : `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&page=1&with_original_language=en`,
    search_movies : `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=`

   
  };
  export const tvUrls = {
    top_10_tv_shows : `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&sort_by=popularity.desc&page=1&with_original_language=en`,
    
    search_tv_shows : `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=en-US&query=`
  };