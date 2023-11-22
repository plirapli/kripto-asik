import { authRest, rest } from "../../config/httpClient";

const postImage = async (userData) =>
  authRest
    .post(
      '/files/',
      userData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject({ ...response.data }));

const postKey = async (userData) =>
  authRest
    .post(
      '/files/key',
      userData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject({ ...response.data }));

export { postImage, postKey }