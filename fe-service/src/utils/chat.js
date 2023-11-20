import { authRest } from "../../config/httpClient";

const getChats = async () =>
  authRest
    .get('/chats')
    .then(({ data }) => data.data)
    .catch(({ response }) => Promise.reject(response));

export { getChats }