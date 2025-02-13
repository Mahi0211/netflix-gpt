import React from "react";
import playIcon from "../assets/Icons/icons8-play-30.png";
import infoIcon from "../assets/Icons/icons8-info-64.png";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-[13%] px-24 absolute z-10 bg-gradient-to-r from-black text-white w-screen aspect-video">
      <h1 className="font-pfmellon text-8xl font-bold">{title}</h1>
      <p className="font-openSans py-6 w-1/4 text-justify">{overview}</p>
      <div className="flex w-1/4 gap-4 justify-between">
        <button className="flex items-center gap-4 bg-white hover:bg-gray-400 text-black font-semibold py-4 shadow-md transition-all duration-300 w-[165px] justify-center bg-opacity-90 rounded-md">
          <img className="w-5 h-5" src={playIcon} alt="Play Icon" />
          <span>Play</span>
        </button>
        <button className="flex items-center justify-center gap-4 bg-white hover:bg-gray-200 py-4 text-black font-semibold w-[165px] shadow-md transition-all duration-300 bg-opacity-20 hover:bg-opacity-40 rounded-md">
          <img className="w-5 h-5" src={infoIcon} alt="Information-Icon" />
          <span className="text-white">More info</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
