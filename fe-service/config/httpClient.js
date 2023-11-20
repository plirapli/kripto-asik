import axios from 'axios';
// import { getLocalAccessToken } from '../utils/auth';

const config = {
  baseURL: 'http://localhost:3002/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create instance
const rest = axios.create(config);
const authRest = axios.create(config);

// Using default header
authRest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')?.toString();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// authRest.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     return Promise.reject(err);
//   }
// );

export { rest, authRest };
