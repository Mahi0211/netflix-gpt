import React, { useRef, useState } from "react";
import lang from "../utils/langConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGeminiMovieResult } from "../redux/gptSlice";

const GptSearchbar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const [generatedRes, setGeneratedRes] = useState("");
  const dispatch = useDispatch();

  const prompt = useRef();

  // Search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const res = await data.json();
    return res.results;
  };

  const handleGptSearchClick = async () => {
    // Make an API call to GeminiAI and get Movie Results
    try {
      const geminiQuery =
        "Act as a Movie Recommandetion system and suggest some movies foe the query :" +
        prompt.current.value +
        ". Only give me names of 5 movies, comma seperated liked the example result given ahead. Example Result: GOAT, Siruthai, Ponniyin Selvan: Part II, Puli, Kaalai. Don't give a movie like singam (Tamil)";

      const response = await fetch("http://localhost:3001/generate-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: geminiQuery }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const geminiMovies = data.result
        .trim()
        .split(", ")
        .map((movie) => movie.trim()); //remove unwanted spaces

      const promiseArray = geminiMovies.map((movie) => searchMovieTMDB(movie)); //search req to the TMDB API
      const movieData = await Promise.all(promiseArray); //it take some time, so it returned a array with promises, [promises, promises, promises....]

      dispatch(
        addGeminiMovieResult({
          movieNames: geminiMovies,
          movieResults: movieData,
        })
      ); //store the moviedata to the app store

      // setGeneratedRes(movieData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setGeneratedRes(`Error: ${error.message}`);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center p-[120px] w-full h-[2050px] bg-black/10 backdrop-blur-sm shadow-lg border border-white/20">
        <form
          className="w-1/2 grid grid-cols-12 absolute"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={prompt}
            type="text"
            className="p-4 m-4 col-span-9 rounded-lg shadow-lg"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button
            className="col-span-3 m-4 py-2 px-4 bg-[#C30702] text-white rounded-lg shadow-lg"
            onClick={handleGptSearchClick}
          >
            {lang[langKey].search}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GptSearchbar;
