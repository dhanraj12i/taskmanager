import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApiState {
  isLoading: boolean;
  shouldRefetch: boolean;
  isListView: boolean;
}

const initialState: ApiState = {
  isLoading: false,
  shouldRefetch: false,
  isListView: true,
};

const globalSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    isRefetch: (state, action: PayloadAction<boolean>) => {
      state.shouldRefetch = action.payload;
    },
    setViewType: (state, action: PayloadAction<boolean>) => {
      state.isListView = action.payload;
    },
  },
});

export const { isLoading, isRefetch, setViewType } = globalSlice.actions;

export default globalSlice.reducer;
