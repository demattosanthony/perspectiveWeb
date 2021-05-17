import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  userId: "",
  email: "",
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
  },
});

export const { setUserLogin, setSignOut } = userSlice.actions;

export const selectUserEmail = (state) => state.user.email;
export const selectUserId = (state) => state.user.userId;

export default userSlice.reducer;
