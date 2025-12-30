import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import expenseSlice from "./expenseSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

/* 1️⃣ rootReducer FIRST */
const rootReducer = combineReducers({
  auth: authSlice,
  expense: expenseSlice,
});

/* 2️⃣ persist config */
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

/* 3️⃣ persisted reducer */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* 4️⃣ store */
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/* 5️⃣ export both */
export const persistor = persistStore(store);
export default store;
