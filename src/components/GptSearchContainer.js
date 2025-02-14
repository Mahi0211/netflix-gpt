import React from "react";
import { BG_IMG } from "../utils/constants";
import GptSearchbar from "./GptSearchbar";

const GptSearchContainer = () => {
  return (
    <div>
      <img src={BG_IMG} alt="bg-image" className="absolute -z-10" />
      <GptSearchbar />
    </div>
  );
};

export default GptSearchContainer;
