import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import albumReducer from "../features/album/albumSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    album: albumReducer,
  },
});
