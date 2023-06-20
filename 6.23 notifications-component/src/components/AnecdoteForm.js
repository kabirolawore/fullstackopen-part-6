import { useMutation, useQueryClient } from 'react-query';
import { createAnecdote } from '../requests';
import { useContext } from 'react';
import AnecdoteContext from '../AnecdoteContext';

const AnecdoteForm = () => {
  //
  const [_notification, dispatch] = useContext(AnecdoteContext);

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    newAnecdoteMutation.mutate({ content, votes: 0 });
    dispatch({
      type: 'SHOWNOTIFICATION',
      payload: `You added "${content}"`,
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
