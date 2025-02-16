import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";

const GptMovieSuggestion = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  return (
    <div className="-mt-[550px]">
      <div>
        <MovieList title={movieNames[0]} movies={movieResults[0]} />
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
