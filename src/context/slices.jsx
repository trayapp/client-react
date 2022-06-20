import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUser,
  fetchToken,
  fetchCartItems,
} from "../utils/fetchLocalStorageData";

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
    cartItems: fetchCartItems(),
    cartShow: false,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    updateCartItem: (state, action) => {
      // eslint-disable-next-line array-callback-return
      state.cartItems = state.cartItems
        .filter((item) => item.id === action.payload.id)
        .map((item) => {
          let data = state.cartItems[0];
          if (action.payload.action === "add") {
            item.productQty += 1;
          } else {
            if (item.productQty === 1) {
              data =
                state.cartItems && state.cartItems.length > 1
                  ? state.cartItems.filter(
                      (item) => item.id !== action.payload.id
                    )[0]
                  : [...state.cartItems];
            }
            item.productQty -= 1;
          }
          return data;
        });
    },
    setCartShow: (state, action) => {
      state.cartShow = action.payload;
    },
  },
});
