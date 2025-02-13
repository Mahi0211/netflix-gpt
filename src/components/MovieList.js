import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 600; // Adjust scroll speed
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 600; // Adjust scroll speed
    }
  };

  return (
    <div className="px-6 pb-4 relative">
      <h1 className="text-3xl py-4 text-white">{title}</h1>
      {/* Left Scroll Button */}
      <button
        onClick={scrollLeft}
        className="absolute right-[100px] top-[35px] transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Movie List */}
      <div ref={scrollRef} className="flex scroll-container no-scrollbar">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} moviePoster={movie.poster_path} />
          ))}
        </div>
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={scrollRight}
        className="absolute right-[50px] top-[35px] transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

export default MovieList;
