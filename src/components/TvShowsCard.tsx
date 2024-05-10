import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SingleTVShow from "./SingleTVShow";
import ShowPagaination from "./ShowPagaination";
import { Context } from "../App";
import { tvUrls } from "./ApiUrls";

export default function TvShowsCard() {
  const { searchTerm, pageShow } = useContext(Context);

  const [tvShows, setTvShows] = useState<any>([]);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  async function searchTVShows(tvShow = "") {
    const url =
      tvShow.length < 3
        ? tvUrls.top_10_tv_shows
        : `${tvUrls.search_tv_shows}${tvShow}&page=${pageShow}`;

    try {
      setIsLoading(true);
      const response = await axios.get(url);
      const data = response.data;

      let top10Shows = data.results.slice(0, 10);
      setTvShows(top10Shows);
      setTotalPages(data.total_pages);

      setIsLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching TV show data:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (searchTerm.length < 3) {
      searchTVShows("");
      setSearchTriggered(false);
      return;
    }

    const debounceFetch = setTimeout(() => {
      if (searchTerm.length >= 3) {
        searchTVShows(searchTerm);
        setSearchTriggered(true);
      }
    }, 1500);

    return () => clearTimeout(debounceFetch);
  }, [searchTerm]);

  useEffect(() => {
    searchTVShows(searchTerm);
  }, [pageShow]);

  return (
    <>
    
    <div className="app">
      {tvShows?.length > 0 && searchTerm.length < 3 ? (
        <div className="title">
          <h1>Top 10 TV Shows</h1>
        </div>
      ) : tvShows?.length > 0 && searchTerm.length >= 3 ? (
        <div className="title">
          <h1>TV Shows</h1>
        </div>
      ) : (
        <div className="title" key="noResults">
          <h1>No TV shows... try search again</h1>
        </div>
      )}

      {isLoading && <h1>loading....</h1>}
      {tvShows?.length > 0 && (
        <div className="container">
          {tvShows.map((tvshow: any) => 
            <div className="movie" key={tvshow.id}>
              <SingleTVShow  show={tvshow} />
            </div>
          )} 

        </div>
      )}

      {searchTriggered && tvShows?.length > 0 && totalPages >= 2 && (
        <ShowPagaination totalPages={totalPages} />
      )}
    </div>
    </>

  );

}
