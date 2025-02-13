import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./slice";

const store = configureStore({
  reducer: {
    globalState: globalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
