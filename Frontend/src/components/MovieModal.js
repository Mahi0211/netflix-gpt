import React from "react";
import VideoBackground from "./VideoBackground";
import { IMG_CDN_URL } from "../utils/constants";
import closeIcon from "../assets/Icons/icons8-close-window-52.png";
import starIcon from "../assets/Icons/icons8-star-96.png";

const MovieModal = ({ movie, onClose }) => {
  let roundedVoteAverage = parseFloat(movie.vote_average.toFixed(1));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black p-6 rounded-lg shadow-lg w-[1000px] h-[600px] relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-700 text-xl"
          onClick={onClose}
        >
          <img
            src={closeIcon}
            alt="close-icon"
            className="w-6 h-6 opacity-80 hover:opacity-100"
          />
        </button>

        {/* Layout Container */}
        <div className="flex flex-col text-white">
          {/* Movie Trailer */}
          <div className="w-[300px] h-[170px] -mt-5">
            <VideoBackground
              movieId={movie.id}
              className="w-[950px] h-[570px]"
            />
          </div>

          <div className="flex flex-col h-[580px] -mt-[170px] bg-gradient-to-r from-black pt-28">
            {/* Movie Poster */}
            <img
              src={`${IMG_CDN_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-[150px] h-[220px] rounded-sm ml-6"
            />

            {/* Movie Info (Title & Description) */}
            <div className="ml-6 flex flex-col flex-grow w-full mt-3">
              <h2 className="text-3xl font-bold mb-2 w-1/2 break-words">
                {movie.title}
              </h2>
              <p className="p-2 rounded-md w-[70%] text-justify break-words whitespace-normal bg-black bg-opacity-30">
                {movie.overview}
              </p>
              <div className="p-2 flex gap-2">
                <img src={starIcon} alt="" className="w-5 h-5" />
                <p>
                  {roundedVoteAverage}
                  <span> ({movie.vote_count})</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
