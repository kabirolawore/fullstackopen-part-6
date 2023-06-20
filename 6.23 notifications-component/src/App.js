import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAnecdotes, updateAnecdote } from './requests';
import { useReducer } from 'react';
import AnecdoteContext from './AnecdoteContext';

const App = () => {
  //
  const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'SHOWNOTIFICATION':
        return { showAlert: true, message: action.payload };
      case 'HIDENOTIFICATION':
        return { showAlert: false, message: '' };
      default:
        return state;
    }
  };

  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    {}
  );

  //
  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const result = useQuery('anecdotes', getAnecdotes, { retry: 1 });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return (
      <span>
        Error: {result.error.message} or Anecdote service not available due to
        problems in server
      </span>
    );
  }

  console.log(result);
  const anecdotes = result.data;
  //

  return (
    <div>
      <h3>Anecdote app</h3>

      <AnecdoteContext.Provider value={[notification, notificationDispatch]}>
        <Notification />
        <AnecdoteForm />
      </AnecdoteContext.Provider>

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{' '}
            <button
              onClick={() => {
                handleVote(anecdote);
                notificationDispatch({
                  type: 'SHOWNOTIFICATION',
                  payload: `You voted "${anecdote.content}"`,
                });
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
