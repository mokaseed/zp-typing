import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
// import type { PayloadAction } from "@reduxjs/toolkit";

interface TypingStatesSlice {
  correctCount: number;
  typoCount: number;
  totalKeys: number;
}

const initialState: TypingStatesSlice = {
  correctCount: 0,
  typoCount: 0,
  totalKeys: 0,
};

const typingStatesSlice = createSlice({
  name: "typingStates",
  initialState,
  reducers: {
    correctCountIncrement(state) {
      state.correctCount++;
    },
    typoCountIncrement(state) {
      state.typoCount++;
    },
    totalKeysIncrement(state) {
      state.totalKeys++;
    },
    refresh(state) {
      state.correctCount = 0;
      state.typoCount = 0;
      state.totalKeys = 0;
    },
  },
});

export const {
  correctCountIncrement,
  typoCountIncrement,
  totalKeysIncrement,
  refresh,
} = typingStatesSlice.actions;

export const selectCorrectCount = (state: RootState) =>
  state.typingStates.correctCount;
export const selectTypoCount = (state: RootState) => state.typingStates.typoCount;
export const selectTotalKeys = (state: RootState) => state.typingStates.totalKeys;

export default typingStatesSlice.reducer;
