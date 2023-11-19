import { rest } from "../../config/httpClient";

// Send Login
const postLogin = async (userData) =>
  rest
    .post('/users/login', userData)
    .then(({ data }) => data)
    .catch(({ response }) => {
      if (response.status === 400)
        return Promise.reject({ ...response, message: 'Username atau Password yang anda masukkan salah' })
    });

const postRegister = async (userData) =>
  rest
    .post('/users/register', userData)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject({ ...response.data }));

export { postLogin, postRegister }