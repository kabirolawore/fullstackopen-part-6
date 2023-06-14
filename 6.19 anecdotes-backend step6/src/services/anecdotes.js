import axios from 'axios';

const baseurl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseurl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseurl, object);

  return response.data;
};

const updateVote = async (id, content) => {
  const object = content;
  const response = await axios.put(`${baseurl}/${id}`, object);

  return response.data;
};

// eslint-disable-next-line
export default { getAll, createNew, updateVote };
