import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NewAnecdote from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

import anecdoteService from './services/anecdotes';
import { setAnecdotes } from './reducers/anecdoteReducer';

import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <NewAnecdote />
    </div>
  );
};

export default App;
