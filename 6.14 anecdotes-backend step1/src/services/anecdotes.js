import axios from 'axios';

const baseurl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseurl);
  return response.data;
};

// eslint-disable-next-line
export default { getAll };
