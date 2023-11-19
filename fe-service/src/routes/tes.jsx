/* eslint-disable react/prop-types */
import { getContact } from '../utils/contacts';

export default function Chat() {
  // const { contact } = getContact(params.username);

  const dummyContact = {
    username: 'tes',
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
