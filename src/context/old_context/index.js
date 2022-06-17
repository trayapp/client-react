import React, { createContext, useContext, useReducer } from "react";
import { fetchCartItems } from "../../utils/fetchLocalStorageData";

// initialState.js
export const initialState = {
  cartItems: fetchCartItems(),
  cartShow: false,
};

// reducer.js
export const actionType = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_SHOW: "SET_CART_SHOW",
};
export const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };
    case actionType.SET_CART_SHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      };

    default:
      return state;
  }
};
// StateProvider.js

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
