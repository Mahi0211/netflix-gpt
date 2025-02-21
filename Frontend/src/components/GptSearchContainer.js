import React from "react";
import { BG_IMG } from "../utils/constants";
import GptSearchbar from "./GptSearchbar";
import GptMovieSuggestion from "./GptMovieSuggestion";

const GptSearchContainer = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img
          src={BG_IMG}
          alt="bg-image"
          className="h-screen w-screen object-cover"
        />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm shadow-lg border border-white/20"></div>
      </div>
      <div className="flex flex-col">
        <GptSearchbar />
        <GptMovieSuggestion />
      </div>
    </>
  );
};

export default GptSearchContainer;
