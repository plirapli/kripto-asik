import { rest } from "../../config/httpClient";

const postImage = async (userData) =>
  rest
    .post(
      '/files/upload',
      userData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject({ ...response.data }));

const postKey = async (userData) =>
  rest
    .post(
      '/files/upload-key',
      userData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject({ ...response.data }));

export { postImage, postKey }