import React, { useEffect, useState } from "react";
import VideoBackground from "./VideoBackground";
import { IMG_CDN_URL } from "../utils/constants";
import closeIcon from "../assets/Icons/icons8-close-window-52.png";
import starIcon from "../assets/Icons/icons8-star-96.png";

const MovieModal = ({ movie, onClose }) => {
  const [wordLimit, setWordLimit] = useState(60);

  useEffect(() => {
    const updateWordLimit = () => {
      if (window.innerWidth <= 768) {
        // If max-lg (lg: 1024px)
        setWordLimit(15);
      } else if (window.innerWidth <= 1024) {
        // If max-lg (lg: 1024px)
        setWordLimit(25);
      } else {
        setWordLimit(60);
      }
    };

    updateWordLimit(); // Run once on mount
    window.addEventListener("resize", updateWordLimit); // Listen for screen resize

    return () => window.removeEventListener("resize", updateWordLimit); // Cleanup
  }, []);

  let roundedVoteAverage = parseFloat(movie.vote_average.toFixed(1));
  const year = new Date(movie.release_date).getFullYear();

  function trimParagraph(paragraph, n) {
    const words = paragraph.split(" ");
    if (words.length <= n) return paragraph;
    return words.slice(0, n).join(" ") + "...";
  }

  const paragraph = movie.overview;
  const title = movie.title;
  const trimmedParagraph = trimParagraph(paragraph, wordLimit);
  const trimmedTitle = trimParagraph(title, 9);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black p-6 rounded-lg shadow-lg w-[1000px] max-lg:w-[750px] max-md:w-[650px] max-sm:w-[450px] h-[550px] max-lg:h-[400px] max-md:h-[300px] max-sm:h-[400px] relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-700 text-xl z-50"
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
          <div className="w-[300px] max-sm:w-[400px] h-[170px] max-sm:h-[380px] -mt-4 max-sm:overflow-hidden max-sm:relative">
            <VideoBackground
              movieId={movie.id}
              className="w-[950px] max-lg:w-[700px] max-md:w-[600px] max-sm:w-full h-[570px] max-lg:h-[370px] max-md:h-[280px] max-sm:h-full max-sm:object-cover max-sm:inset-0 max-sm:absolute"
            />
          </div>

          <div className="flex flex-col h-[580px] max-lg:h-[380px] max-md:h-[280px] -mt-[170px] bg-gradient-to-r from-black pt-28 max-lg:pt-10 max-sm:z-10 max-sm:-mt-[380px]">
            {/* Movie Poster */}
            <img
              src={`${IMG_CDN_URL}${movie.poster_path}`}
              alt={trimmedTitle}
              className="w-[150px] max-lg:w-[110px] max-md:w-[80px] h-[220px] max-lg:h-[160px] max-md:h-[120px] rounded-md shadow-lg ml-6 max-sm:ml-[2px] max-sm:mt-16"
            />

            {/* Movie Info (Title & Description) */}
            <div className="ml-6 max-sm:ml-[2px] flex flex-col flex-grow w-full mt-3">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl max-lg:text-2xl max-md:text-xl font-bold mb-2 break-words">
                  {trimmedTitle}
                </h2>
                <p className="max-md:text-sm">({year})</p>
              </div>

              <p className="p-2 rounded-md w-[70%] text-justify break-words whitespace-normal bg-black bg-opacity-30 shadow-lg max-lg:text-sm">
                {trimmedParagraph
                  ? trimmedParagraph
                  : "There is no overview about this movie"}
              </p>

              <div className="p-2 max-md:p-0 max-sm:p-1 flex gap-2">
                <img
                  src={starIcon}
                  alt=""
                  className="w-5 h-5 max-lg:w-4 max-lg:h-4"
                />
                <p className="max-lg:text-sm">
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
