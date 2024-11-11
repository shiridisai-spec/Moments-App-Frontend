import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer"; // Combines your slices
import { apiSlice } from "../slices/apiSlice"; // Correct import for API slice

const createNoopStorage = () => ({
  getItem: () => Promise.resolve(null),
  setItem: () => Promise.resolve(),
  removeItem: () => Promise.resolve(),
});

const webStorage =
  typeof window !== "undefined" ? storage : createNoopStorage();

const persistConfig = {
  key: "root",
  storage: webStorage,
  whitelist: ["authSlice", "publicMomentsSlice"], // Persist only the authSlice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Directly using persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware), // Add RTK Query middleware
  devTools: process.env.NODE_ENV !== "production",
});

const persistor = persistStore(store);

setupListeners(store.dispatch);
export { store, persistor };
