import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      const content = action.payload;
      state.push({
        content,
        votes: 0,
        id: getId(),
      });
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
export default anecdoteSlice.reducer;
