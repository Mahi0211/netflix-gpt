import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addMovieTrailer, addSelectedMovieTrailer } from "../redux/moviesSlice";

const useMovieTrailer = ({ movieId, isHomeTrailer = false }) => {
  const dispatch = useDispatch();

  const getMovieTrailer = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        API_OPTIONS
      );
      const data = await res.json();

      if (!data.results || data.results.length === 0) {
        console.warn("No videos available for this movie.");
        dispatch(
          isHomeTrailer ? addMovieTrailer(null) : addSelectedMovieTrailer(null)
        );
        return;
      }

      // Try to find a trailer first
      let video = data.results.find((video) => video.type === "Trailer");

      // If no trailer, fallback to a teaser
      if (!video) {
        video = data.results.find((video) => video.type === "Teaser");
      }

      // If still no video, return null
      if (!video || !video.key) {
        console.warn("No trailer or teaser found.");
        dispatch(
          isHomeTrailer ? addMovieTrailer(null) : addSelectedMovieTrailer(null)
        );
        return;
      }

      // Dispatch to the correct state
      dispatch(
        isHomeTrailer
          ? addMovieTrailer(video.key)
          : addSelectedMovieTrailer(video.key)
      );
    } catch (error) {
      console.error("Error fetching movie trailer:", error);
      dispatch(
        isHomeTrailer ? addMovieTrailer(null) : addSelectedMovieTrailer(null)
      );
    }
  };

  useEffect(() => {
    getMovieTrailer();
  }, [movieId]); // Ensure it runs when `movieId` changes
};

export default useMovieTrailer;
