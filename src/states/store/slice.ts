import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApiState {
  isLoading: boolean;
  isRefetch: boolean;
  isListView: boolean;
  uuID: string;
  searchText: string;
  filters: {
    category: string;
    dueDate: string;
  };
}

const initialState: ApiState = {
  isLoading: false,
  isRefetch: false,
  isListView: true,
  uuID: "",
  searchText: "",
  filters: {
    category: "All",
    dueDate: "All",
  },
};

const globalSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUUID: (state, action: PayloadAction<string>) => {
      state.uuID = action.payload;
    },
    setRefetch: (state, action: PayloadAction<boolean>) => {
      state.isRefetch = action.payload;
    },
    setViewType: (state, action: PayloadAction<boolean>) => {
      state.isListView = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<{ category?: string; dueDate?: string }>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  setIsLoading,
  setRefetch,
  setViewType,
  setUUID,
  setSearchText,
  setFilters,
} = globalSlice.actions;

export default globalSlice.reducer;
