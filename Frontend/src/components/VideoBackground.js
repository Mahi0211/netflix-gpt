import { useSelector } from "react-redux";
import getMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId, className, isHomeTrailer = false }) => {
  getMovieTrailer({ movieId, isHomeTrailer });

  const trailerKey = useSelector((state) =>
    isHomeTrailer
      ? state.movies?.movieTrailer
      : state.movies?.selectedMovieTrailer
  );

  return (
    <div>
      <iframe
        className={className}
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&loop=1&playlist=${trailerKey}&mute=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
