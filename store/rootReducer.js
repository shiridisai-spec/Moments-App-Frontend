import { combineReducers } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";
import publicMomentsSliceReducer from "./publicMomentsSlice";
import { apiSlice } from "../slices/apiSlice"; // Ensure correct import here
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authSlice", "publicMomentsSlice"], // Only authSlice will be persisted
};

const rootReducer = combineReducers({
  api: apiSlice.reducer,
  authSlice: authSliceReducer,
  publicMomentsSlice: publicMomentsSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
