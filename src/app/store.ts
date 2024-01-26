import { configureStore } from "@reduxjs/toolkit";
import typingStatesSlice from "../features/typingCount/typingStatesSlice";

const store = configureStore({
  reducer: {
    typingStates: typingStatesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;