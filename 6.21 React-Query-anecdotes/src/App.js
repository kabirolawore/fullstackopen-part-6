import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery } from 'react-query';
import { getAnecdotes } from './requests';

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote');
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

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{' '}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
