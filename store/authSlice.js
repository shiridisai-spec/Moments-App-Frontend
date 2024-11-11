import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logoutUser: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
