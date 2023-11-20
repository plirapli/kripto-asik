import { rest } from '../../config/httpClient';

const getContacts = async () =>
  rest
    .get('/users')
    .then(({ data }) => data.data)
    .catch(({ response }) => Promise.reject(response));

const getContact = async (id) =>
  rest
    .get(`/users/${id}`)
    .then(({ data }) => data.data)
    .catch(({ response }) => Promise.reject(response));

export { getContacts, getContact }