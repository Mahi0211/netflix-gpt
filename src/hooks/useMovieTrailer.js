import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer = () => {
  const getMovieTrailer = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/939243/videos",
      API_OPTIONS
    );
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    getMovieTrailer();
  }, []);
};

export default useMovieTrailer;
