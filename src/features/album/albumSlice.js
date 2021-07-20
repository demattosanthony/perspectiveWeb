import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  albumId: "",
  loading: false
};

const albumSlice = createSlice({
  name: "album",
  initialState: initalState,
  reducers: {
    setAlbumId: (state, action) => {
      state.albumId = action.payload.albumId;
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    }
  },
});

export const { setAlbumId, setLoading } = albumSlice.actions;

export const selectAlbumId = (state) => state.album.albumId;
export const selectLoading = (state) => state.album.loading;

export default albumSlice.reducer;
