import { createSlice } from '@reduxjs/toolkit';

const initialState = 'render notification here...';
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify: (state, action) => {
      const content = action.payload;
      return state;
    },
  },
});

export const { notify } = notificationSlice.actions;
export default notificationSlice.reducer;
