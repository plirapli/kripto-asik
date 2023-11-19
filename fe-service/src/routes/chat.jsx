/* eslint-disable react/prop-types */
import { useLoaderData } from 'react-router-dom';
import { getContact } from '../utils/contacts';

export default function Chat() {
  const { contact } = useLoaderData();

  const dummyContact = {
    username: contact.username,
    avatar: 'https://placekitten.com/g/200/200',
  };

  return (
    <div id='contact'>
      <div>
        <img key={dummyContact.avatar} src={dummyContact.avatar || null} />
      </div>

      <div>
        <h1>{dummyContact.username}</h1>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const contact = await getContact(params.username);
  return { contact };
}
