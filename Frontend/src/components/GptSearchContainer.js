import React from "react";
import { BG_IMG } from "../utils/constants";
import GptSearchbar from "./GptSearchbar";
import GptMovieSuggestion from "./GptMovieSuggestion";

const GptSearchContainer = () => {
  return (
    <div className="flex flex-col">
      <img src={BG_IMG} alt="bg-image" className="fixed -z-10" />
      <GptSearchbar />
      <GptMovieSuggestion />
    </div>
  );
};

export default GptSearchContainer;
