import { useSelector, useDispatch } from 'react-redux';
import { vote } from './reducers/anecdoteReducer';
import NewAnecdote from './components/AnecdoteForm';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{' '}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
      <NewAnecdote />
    </div>
  );
};

export default App;
