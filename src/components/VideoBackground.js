import { useSelector } from "react-redux";
import getMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  getMovieTrailer({ movieId });

  const trailerKey = useSelector((state) => state.movies?.movieTrailer);

  return (
    <div>
      <iframe
        src={" https://www.youtube.com/embed/" + trailerKey}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
