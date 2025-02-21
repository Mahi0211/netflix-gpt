import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ moviePoster, onClick }) => {
  if (!moviePoster) return null;

  return (
    <div className="w-[200px] max-sm:w-[150px] max-lg:w-[165px] max-lg:hover:w-[175px] max-sm:hover:w-[160px] pr-4 hover:w-[220px] transition-all duration-300 cursor-pointer">
      <img
        src={IMG_CDN_URL + moviePoster}
        alt="Movie Poster"
        className="rounded-md"
        onClick={onClick}
      />
    </div>
  );
};

export default MovieCard;
