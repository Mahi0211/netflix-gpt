import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";

const GptMovieSuggestion = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if (!movieNames) return null;

  return (
    <div className="-mt-[540px] max-md:-mt-[470px] bg-black rounded-lg bg-opacity-50 mx-10 max-sm:mx-5 z-0 flex flex-col mb-5">
      <div className="text-white text-center py-5 max-md:m-4  max-lg:m-8 max-lg:p-4 max-md:p-2  mx-32 mt-10 mb-5 rounded-lg bg-white bg-opacity-10 font-semibold">
        {movieNames.join(", ")}
      </div>

      <div>
        {movieNames.map((movieName, index) => {
          const filteredMovies = movieResults[index]?.filter(
            (movie) => movie.poster_path
          );

          return filteredMovies.length > 0 ? (
            <MovieList
              key={movieName}
              title={movieName}
              movies={filteredMovies}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
