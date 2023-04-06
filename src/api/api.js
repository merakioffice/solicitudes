import { json } from 'react-router-dom';
import { getEnvVariables } from '../helpers';
const { VITE_API_URL }  = import.meta.env;

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

const fetchPut = async (url = '', method = '', data) => {
  const response = await fetch(`${VITE_API_URL}/${url}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
};

const createFormData = async  (url = '', method = '', data) =>  {
    try {
      const response = await fetch(`${VITE_API_URL}/${url}`, {
        method: 'POST',
        body: data
      });
        const jsonData = await response.json();
        console.log(jsonData)
        return jsonData;
    } catch (error) {
        console.error("CREATE FORMDATA ERROR ", error)
    }
  }

export { fetchGet, fetchDelete, fetchPost, fetchPut, createFormData };
