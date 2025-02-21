import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";

const MovieList = ({ title, movies }) => {
  const scrollRef = useRef(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 500; // Adjust scroll speed
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 500; // Adjust scroll speed
    }
  };

  return (
    <div className="px-6 pb-4 relative max-sm:-mt-5">
      <h1 className="text-3xl max-lg:text-2xl py-4 text-white">{title}</h1>
      {/* Left Scroll Button */}
      <button
        onClick={scrollLeft}
        className="absolute right-[80px] top-[35px] transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
      >
        <FaChevronLeft className="chevron-icon" />
      </button>

      {/* Movie List */}
      <div ref={scrollRef} className="flex scroll-container no-scrollbar">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              moviePoster={movie.poster_path}
              movieDetail={movie}
              onClick={() => setSelectedMovie(movie)}
              isHomeTrailer={false}
            />
          ))}
          {selectedMovie && (
            <MovieModal
              movie={selectedMovie}
              onClose={() => setSelectedMovie(null)}
            />
          )}
        </div>
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={scrollRight}
        className="absolute right-[30px] top-[35px] transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
      >
        <FaChevronRight className="chevron-icon" />
      </button>
    </div>
  );
};

export default MovieList;
