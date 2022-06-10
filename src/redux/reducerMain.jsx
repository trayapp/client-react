import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authTokenSlice, cartSlice, AlertSlice, foodItemsSlice } from "../context/slices";

const persistConfigMain = {
  key: "root",
  storage,
  blacklist: ["alerts", "authToken"],
};

const persistConfigAuthToken = {
  key: "authToken",
  storage,
  blacklist: ["token", "user"],
};

const rootReducerMain = combineReducers({
  authToken: persistReducer(persistConfigAuthToken, authTokenSlice.reducer),
  notifications: AlertSlice.reducer,
  foodItems: foodItemsSlice.reducer,
  cartItems: cartSlice.reducer
});

export const persistedReducerMain = persistReducer(
  persistConfigMain,
  rootReducerMain
);
