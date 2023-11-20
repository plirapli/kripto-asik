import { authRest, rest } from "../../config/httpClient";

// Send Login
const postLogin = async (userData) =>
  rest
    .post('/users/login', userData)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject({ ...response.data }));

const postRegister = async (userData) =>
  rest
    .post('/users/register', userData)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject({ ...response.data }));

const autoSignIn = async () =>
  authRest
    .get('/users/profile')
    .then(({ data }) => data)
    .catch((response) => Promise.reject(response));

const logout = () => localStorage.removeItem('access_token');

const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export { postLogin, postRegister, autoSignIn, logout, parseJwt }