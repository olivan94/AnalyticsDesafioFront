import { createSlice, current } from "@reduxjs/toolkit";

const latestResults = localStorage.getItem('latestGameResults') !== null ? JSON.parse(localStorage.getItem('latestGameResults')) : [];

const historyInitialState = {
  latestGameResults: latestResults
}

const historySlice = createSlice({
  name: 'history',
  initialState: historyInitialState,
  reducers: {
    
    addToHistoryList: (state, action) => {
      let tmpState = [...current(state.latestGameResults)];
      tmpState.unshift(action.payload);
      state.latestGameResults = tmpState;
    },

    resetHistory: (state) => {
      state.latestGameResults = [];
      localStorage.setItem('latestGameResults', JSON.stringify([]));
    }
  }
});

export default historySlice.reducer;

export const {
  addToHistoryList,
  resetHistory
} = historySlice.actions;