import React from "react";
import { BG_IMG } from "../utils/constants";
import GptSearchbar from "./GptSearchbar";
import GptMovieSuggestion from "./GptMovieSuggestion";

const GptSearchContainer = () => {
  return (
    <div className="flex flex-col">
      <div className="fixed -z-10">
        <img src={BG_IMG} alt="bg-image" className="max-sm:h-screen max-sm:object-cover" />
      </div>
      <GptSearchbar />
      <GptMovieSuggestion />
    </div>
  );
};

export default GptSearchContainer;
