import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const anecdoteSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange: (state = initialState, action) => {
      state = action.payload;
      return state;
    },
  },
});
// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export const filterChange = (filter) => {
//   return {
//     type: 'SET_FILTER',
//     payload: filter,
//   };
// };

export const { filterChange } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
