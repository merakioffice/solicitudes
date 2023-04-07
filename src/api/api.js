import { json } from 'react-router-dom';
import { getEnvVariables } from '../helpers';
import { useNavigate } from 'react-router-dom';
const { VITE_API_URL }  = import.meta.env;

const token = localStorage.getItem('token')

const fetchGet = async (url = '', method = 'GET') => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${VITE_API_URL}/${url}`, { method, headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    
  } });

  const result = response.json();
  return result;
};

const fetchDelete = async (url = '', method = 'DELETE') => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${VITE_API_URL}/${url}`, { method,  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    
  }  });

  const result = response.json();
  return result;
};

const fetchPost = async (url = '', method = '', data) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${VITE_API_URL}/${url}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      
    }, 
    body: JSON.stringify(data),
  });

  const result = response.json();
  return result;
};

const fetchPut = async (url = '', method = '', data) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${VITE_API_URL}/${url}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

     return result;
};

const createFormData = async  (url = '', method = '', data) =>  {
  
  const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${VITE_API_URL}/${url}`, {
        method: 'POST',
        body: data,
      });
        const jsonData = await response.json();
        console.log(jsonData)
        return jsonData;
    } catch (error) {
        console.error("CREATE FORMDATA ERROR ", error)
    }
  }



const fetchLogin = async (url = '', method = '', data)=> {
  const res = await fetch(`${VITE_API_URL}/${url}`, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .catch(error => console.error(error));
     const result = await res.json();
 
     return result;

}


const fetchSearchUser = async (url = '', method = '', id)=> {
  const token = localStorage.getItem('token')
  const res = await fetch(`${VITE_API_URL}/${url}/${id}`, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      
    }
  })
   
     const result = await res.json();
 
     return result;

}


const fetchUserLogout=  ()=> {
  const navigate = useNavigate();
  localStorage.removeItem('token');
  navigate('/')


}






export { fetchGet, fetchDelete, fetchPost, fetchPut, fetchLogin, fetchSearchUser, fetchUserLogout, createFormData };
