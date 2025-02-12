import { useState, useEffect } from "react";
import images from "../assets/movieImages";

// Custom hook to get the movie image
const useMovieImage = (mainMovie) => {
  const [mainMovieImage, setMainMovieImage] = useState(null);

  const bannerMovies = [
    {
      name: "The Substance",
      img: images.substance,
    },
    {
      name: "Anora",
      img: images.anora,
    },
    {
      name: "Captain America: Brave New World",
      img: images.captainAmerica,
    },
  ];

  useEffect(() => {
    if (mainMovie) {
      const movie = bannerMovies.find(
        (movie) => movie.name === mainMovie.original_title
      );
      setMainMovieImage(movie ? movie.img : null);
    }
  }, [mainMovie]);

  return mainMovieImage;
};

export default useMovieImage;
