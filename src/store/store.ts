import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import { marketsApi } from "./marketPrices";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [marketsApi.reducerPath]: marketsApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(marketsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
