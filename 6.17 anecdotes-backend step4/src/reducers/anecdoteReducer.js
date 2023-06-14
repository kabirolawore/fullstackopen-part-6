import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
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
    appendAnecdote: (state, action) => {
      state.push(action.payload);
    },
    setAnecdotes: (_state, action) => {
      return action.payload;
    },
  },
});

export const { vote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export default anecdoteSlice.reducer;
