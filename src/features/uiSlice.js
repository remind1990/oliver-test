import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: 'div',
  width: '100px',
  height: '100px',
  backgroundColor: '#ffff',
  textColor: '#000',
};

const uiSlice = createSlice({
  name: 'uiSlice',
  initialState,
  reducers: {
    updateWidth(state, action) {
      state.width = action.payload + 'px';
    },
    updateHeight(state, action) {
      state.height = action.payload + 'px';
    },
    updateBackground(state, action) {
      state.backgroundColor = action.payload;
    },
    updateTextColor(state, action) {
      state.textColor = action.payload;
    },
  },
});

export const {
  updateWidth,
  updateHeight,
  updateBackground,
  updateTextColor,
} = uiSlice.actions;

export default uiSlice.reducer;
