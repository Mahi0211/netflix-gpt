import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";

const GptMovieSuggestion = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if (!movieNames) return null;

  return (
    <div className="-mt-[550px]">
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
