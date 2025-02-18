import { useSelector } from "react-redux";
import getMovieTrailer from "../hooks/useMovieTrailer";
import { IMG_CDN_URL } from "../utils/constants";

const VideoBackground = ({ movieId, className, isHomeTrailer = false }) => {
  getMovieTrailer({ movieId, isHomeTrailer });

  const trailerKey = useSelector((state) =>
    isHomeTrailer
      ? state.movies?.movieTrailer
      : state.movies?.selectedMovieTrailer
  );

  const movie = useSelector((state) =>
    state.gpt?.movieResults?.flat().find((m) => m.id === movieId)
  );

  const placeholderImg = movie?.backdrop_path
    ? `${IMG_CDN_URL}${movie.backdrop_path}`
    : `${IMG_CDN_URL}${movie?.poster_path}`;

  // Handle the case where the trailer is still loading
  if (trailerKey === undefined) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-black">
        <p className="text-white">Loading trailer...</p>
      </div>
    );
  }

  // Handle case where there is no valid trailer or teaser
  if (!trailerKey) {
    return (
      <div className="flex items-center justify-center w-[950px] h-[540px] bg-black mt-[20px]">
        {placeholderImg ? (
          <img
            src={placeholderImg}
            alt="Movie Poster"
            className="w-full h-full object-fit rounded-lg"
          />
        ) : (
          <p className="text-white">Trailer not available</p>
        )}
      </div>
    );
  }

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
