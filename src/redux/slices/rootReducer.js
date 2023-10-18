import { combineReducers } from "redux";

import historySlice from "./historySlice";

const rootReducer = combineReducers({
  latestGame: historySlice
});

export default rootReducer;