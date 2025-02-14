import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import moviesReducer from "../redux/moviesSlice";
import gptReducer from "../redux/gptSlice";
import langChange from "../redux/lanChangeSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: langChange,
  },
});

export default appStore;
