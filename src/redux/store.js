import { configureStore } from "@reduxjs/toolkit";
import callListReducer from "./features/sliceCallList";

export const store = configureStore({
  reducer: {
    callList: callListReducer,
  },
});
