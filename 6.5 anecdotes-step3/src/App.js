import { useSelector, useDispatch } from 'react-redux';
import { getId } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);

    return {
      type: 'VOTE',
      payload: { id },
    };
  };

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;

    event.target.note.value = '';

    dispatch({
      type: 'NEW_NOTE',
      payload: {
        content,
        votes: 0,
        id: getId(),
      },
    });
  };

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
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div>
          <input name='note' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default App;
