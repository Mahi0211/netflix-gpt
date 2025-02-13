import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ moviePoster }) => {
  return (
    <div className="w-[200px] pr-4">
      <img src={IMG_CDN_URL + moviePoster} alt="Movie Poster" />
    </div>
  );
};

export default MovieCard;
