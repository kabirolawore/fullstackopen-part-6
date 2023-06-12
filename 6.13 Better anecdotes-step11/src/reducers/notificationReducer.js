import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAlert: false,
  message: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      const message = action.payload;
      const showAlert = true;
      return { ...state, showAlert: showAlert, message: message };
    },
    hideNotification: (state, _action) => {
      const message = initialState.message;
      const showAlert = false;
      return { ...state, showAlert: showAlert, message: message };
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
