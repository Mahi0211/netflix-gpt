import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";

const GptMovieSuggestion = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if (!movieNames) return null;

  return (
    <div className="-mt-[540px] bg-black rounded-lg bg-opacity-50 mx-10 z-10">
      <div className="text-white text-center py-10 px-[300px] mx-32 mt-10 mb-5 rounded-lg bg-white bg-opacity-10 font-semibold">
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
