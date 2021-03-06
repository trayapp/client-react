import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, fetchToken } from "../utils/fetchLocalStorageData";

export const getUniqueArrays = (array, key) => {
  if (typeof key !== "function") {
    const property = key;
    key = function (item) {
      return item[property];
    };
  }
  return Array.from(
    array
      .reduce(function (map, item) {
        const k = key(item);
        if (!map.has(k)) map.set(k, item);
        return map;
      }, new Map())
      .values()
  );
};

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
    setAuthUser: (state, { payload }) => {
      state.user = payload;
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
      state.alerts = getUniqueArrays(state.alerts, "message");
    },
    clearAlerts: (state, action) => {
      state.alerts = [];
    },
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

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartShow: false,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = getUniqueArrays(action.payload, "id");
      state.cartItems = getUniqueArrays(action.payload, "avaliableStore");
    },
    AddQty: (state, action) => {
      const filtered = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      filtered.productQty += 1;
      state.cartItems = [...state.cartItems];
    },
    RemoveQty: (state, action) => {
      const filtered = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      filtered.productQty -= 1;
      state.cartItems = [...state.cartItems];
    },
    RemoveCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    setCartShow: (state, action) => {
      state.cartShow = action.payload;
    },
  },
});

export const storeSlice = createSlice({
  name: "store",
  initialState: {
    avaliableItems: [],
  },
  reducers: {
    setAvaliableItems: (state, action) => {
      state.avaliableItems = getUniqueArrays(action.payload, "id");
    },
    RemoveAvaliableItem: (state, action) => {
      state.avaliableItems = state.avaliableItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const productViewerSlice = createSlice({
  name: "currentView",
  initialState: {
    product: null,
  },
  reducers: {
    setCurrentView: (state, action) => {
      state.product = action.payload;
    },
  },
});
