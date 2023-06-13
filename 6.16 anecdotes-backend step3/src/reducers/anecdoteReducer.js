import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      state.push(action.payload);
    },
    vote: (state, action) => {
      const id = action.payload;
      const anecdoteChange = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdoteChange,
        votes: anecdoteChange.votes + 1,
      };

      return state
        .map((note) => (note.id !== id ? note : changedAnecdote))
        .sort((n1, n2) => n2.votes - n1.votes);
    },
    setAnecdotes: (_state, action) => {
      return action.payload;
    },
  },
});

export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  // 'anecdotes/initialize',
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export default anecdoteSlice.reducer;
