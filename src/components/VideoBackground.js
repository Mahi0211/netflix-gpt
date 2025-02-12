import { useSelector } from "react-redux";
import getMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  getMovieTrailer({ movieId });

  const trailerKey = useSelector((state) => state.movies?.movieTrailer);

  return (
    <div className="w-screen aspect-video overflow-hidden">
  <iframe
    className="w-[110%] h-[110%] absolute top-[-100px] left-0 transform scale-110"
    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&loop=1&playlist=${trailerKey}&mute=1`}
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
  ></iframe>
</div>
  );
};

export default VideoBackground;
