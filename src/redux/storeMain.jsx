import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { persistedReducerMain } from "./reducerMain";

export const reduxStoreMain = configureStore({
  reducer: persistedReducerMain,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
  // DEV set devTools to false in production
  devTools: process.env.NODE_ENV !== "production",
});

export const reduxStoreMainPersistor = persistStore(reduxStoreMain);
