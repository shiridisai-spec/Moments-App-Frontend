import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  publicMoments: [],
};

const publicMomentsSlice = createSlice({
  name: "publicMomentsSlice",
  initialState,
  reducers: {
    setAllPublicMoments: (state, action) => {
      state.publicMoments = action.payload;
    },
  },
});

export const { setAllPublicMoments } = publicMomentsSlice.actions;
export default publicMomentsSlice.reducer;
