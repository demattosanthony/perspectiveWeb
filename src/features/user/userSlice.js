import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  userId: "",
  email: "",
  name: "",
  username: "",
  profileImgUrl: "",

};

const userSlice = createSlice({
  name: "user",
  initialState: initalState,
  reducers: {
    setUserLogin: (state, action) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
    },
    setSignOut: (state) => {
      state.email = null;
      state.userId = null;
    },
    setUserInfo: (state, action) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.profileImgUrl = action.payload.profileImgUrl;
    }
  },
});

export const { setUserLogin, setSignOut, setUserInfo } = userSlice.actions;

export const selectUserEmail = (state) => state.user.email;
export const selectUserId = (state) => state.user.userId;
export const selectProfileImg = (state) => state.user.profileImgUrl;

export default userSlice.reducer;
