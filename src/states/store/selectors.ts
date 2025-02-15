import { RootState } from "./store";

const getViewType = (state: RootState) => state.globalState.isListView;
const getUUID = (state: RootState) => state.globalState.uuID;
const getRefetchState = (state: RootState) => state.globalState.isRefetch;
const getSearchText = (state: RootState) => state.globalState.searchText;
const getFilters = (state: RootState) => state.globalState.filters;
const getIsLoading = (state: RootState) => state.globalState.isLoading;

export {
  getViewType,
  getUUID,
  getRefetchState,
  getSearchText,
  getFilters,
  getIsLoading,
};
