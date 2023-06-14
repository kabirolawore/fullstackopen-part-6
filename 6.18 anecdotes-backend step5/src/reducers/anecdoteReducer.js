import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const id = action.payload;
      const anecdoteToVote = state.find((n) => n.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };

      anecdoteService.updateVote(id, votedAnecdote);

      return state
        .map((note) => (note.id !== id ? note : votedAnecdote))
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

export const updateAnecdote = (id) => {
  return async (dispatch) => {
    const updatevote = await anecdoteService.updateVote(id, vote);
    dispatch(vote(updatevote));
  };
};

export default anecdoteSlice.reducer;
