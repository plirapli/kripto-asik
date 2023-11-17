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
// const authApi = axios.create(config);

// // Using default header
// authApi.interceptors.request.use(
//   (config) => {
//     const token = getLocalAccessToken();
//     if (token) {
//       config.headers['Authorization'] = 'Bearer ' + token;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// authApi.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     if (!(window.location.href).includes('/login') && err.response.status === 400) {
//       window.location.replace('/login')
//     }
//     return Promise.reject(err);
//   }
// );

export { rest };
