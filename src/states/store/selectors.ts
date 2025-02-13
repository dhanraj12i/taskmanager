import { RootState } from "./store";

const getViewType = (state: RootState) => state.globalState.isListView;

export { getViewType };
