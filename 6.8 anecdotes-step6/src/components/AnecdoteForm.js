import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/anecdoteReducer';

const NewAnecdote = () => {
  const dispatch = useDispatch();

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;

    event.target.note.value = '';

    dispatch(createNote(content));
  };

  return (
    <div>
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

export default NewAnecdote;
