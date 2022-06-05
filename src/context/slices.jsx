import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, fetchToken } from "../utils/fetchLocalStorageData";

export const authTokenSlice = createSlice({
  name: "authToken",
  initialState: {
    user: fetchUser(),
    token: fetchToken().token,
    refreshToken: fetchToken().refreshToken,
    refreshExpiresIn: null,
  },
  reducers: {
    setAuthToken: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      state.refreshExpiresIn = payload.refreshExpiresIn;
    },
    logOut: (state, { payload }) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.refreshExpiresIn = null;
    },
  },
});

export const AlertSlice = createSlice({
  name: "alert",
  initialState: {
    alerts: [],
  },
  reducers: {
    createAlert: (state, action) => {
      state.alerts.push({
        message: action.payload.message,
        type: action.payload.type,
      });
    },
    clearAlerts: (state, action) => {
      state.alerts = []
    }
  },
});

export const foodItemsSlice = createSlice({
  name: "foodItems",
  initialState: {
    foodItems: null,
  },
  reducers: {
    setFoodItems: (state, action) => {
      state.foodItems = action.payload;
    },
  },
});
