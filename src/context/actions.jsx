import { bindActionCreators } from "@reduxjs/toolkit";
import { reduxStoreMain } from "../redux/storeMain";
import { authTokenSlice, AlertSlice, foodItemsSlice } from "./slices";

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

export { useSelector } from "react-redux";
