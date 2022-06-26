import { bindActionCreators } from "@reduxjs/toolkit";
import { reduxStoreMain } from "../redux/storeMain";
import { authTokenSlice, cartSlice, AlertSlice, foodItemsSlice, storeSlice } from "./slices";

export const authTokenActions = bindActionCreators(
  authTokenSlice.actions,
  reduxStoreMain.dispatch
);
export const alertSliceActions = bindActionCreators(
  AlertSlice.actions,
  reduxStoreMain.dispatch
);

export const foodItemsAction = bindActionCreators(
  foodItemsSlice.actions,
  reduxStoreMain.dispatch
)

export const cartAction = bindActionCreators(
  cartSlice.actions,
  reduxStoreMain.dispatch
)

export const storeAction = bindActionCreators(
  storeSlice.actions,
  reduxStoreMain.dispatch
)

export { useSelector } from "react-redux";
