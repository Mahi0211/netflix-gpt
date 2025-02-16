import { useSelector } from "react-redux";
import getMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  getMovieTrailer({ movieId });

  const trailerKey = useSelector((state) => state.movies?.movieTrailer);

  return (
    <div>
      <iframe
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&loop=1&playlist=${trailerKey}&mute=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
