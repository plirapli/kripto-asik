import { rest } from "../../config/httpClient";

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

export { postLogin, postRegister }