import { authRest } from "../../config/httpClient";

const getChats = async () =>
  authRest
    .get('/chats')
    .then(({ data }) => data.data)
    .catch(({ response }) => Promise.reject({ ...response.data }));

const decrypChat = async (id, data) =>
  authRest
    .post(`/chats/decrypt/${id}`, data)
    .then(({ data }) => data.data)
    .catch(({ response }) => Promise.reject({ ...response.data }));

export { getChats, decrypChat }