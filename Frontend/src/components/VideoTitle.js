import React from "react";
import playIcon from "../assets/Icons/icons8-play-30.png";
import infoIcon from "../assets/Icons/icons8-info-64.png";

const VideoTitle = ({ title, overview }) => {

  function trimParagraph(paragraph, n) {
    const words = paragraph.split(" ");
    if (words.length <= n) return paragraph;
    return words.slice(0, n).join(" ") + "...";
  }

  const trimmedParagraph = trimParagraph(overview, 30);

  return (
    <div className="pt-[13%] max-sm:pt-[40%] max-md:pt-[30%] max-lg:pt-[25%] max-sm:pb-[16%] px-24 max-sm:px-10 max-lg:px-10 absolute z-10 bg-gradient-to-r from-black text-white w-screen aspect-video max-sm:mt-[120px] max-xl:mt-10">
      <h1 className="font-pfmellon max-md:mb-5 text-8xl max-md:text-6xl font-bold">{title}</h1>
      <p className="font-openSans py-6 w-1/3 max-xl:w-[50%] text-justify max-xl:hidden">{trimmedParagraph}</p>
      <div className="flex w-1/4 max-md:w-2/3 gap-4 justify-between">
        <button className="flex items-center gap-4 max-md:gap-2 bg-white hover:bg-gray-400 text-black font-semibold shadow-md transition-all duration-300 w-[165px] max-xl:w-[120px] max-md:py-1 max-xl:py-2 max-xl:mt-4 max-md:mt-0 justify-center bg-opacity-90 rounded-md">
          <img className="w-5 h-5" src={playIcon} alt="Play Icon" />
          <span>Play</span>
        </button>
        <button className="max-xl:hidden flex items-center justify-center gap-4 max-md:gap-2 bg-white hover:bg-gray-200 py-4 max-md:py-0 text-black font-semibold w-[165px] shadow-md transition-all duration-300 bg-opacity-20 hover:bg-opacity-40 rounded-md">
          <img className="w-5 h-5" src={infoIcon} alt="Information-Icon" />
          <span className="text-white">More info</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
