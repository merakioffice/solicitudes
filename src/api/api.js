import { getEnvVariables } from '../helpers';
const { VITE_API_URL } = getEnvVariables();
const fetchGet = async (url = '', method = 'GET') => {
  const response = await fetch(`${VITE_API_URL}/${url}`, { method });

  const result = response.json();
  return result;
};

const fetchDelete = async (url = '', method = 'DELETE') => {
  const response = await fetch(`${VITE_API_URL}/${url}`, { method });

  const result = response.json();
  return result;
};

const fetchPost = async (url = '', method = '', data) => {
  console.log(url);
  console.log(method);
  console.log(data);
  const response = await fetch(`${VITE_API_URL}/${url}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = response.json();
  return result;
};

export { fetchGet, fetchDelete, fetchPost };
