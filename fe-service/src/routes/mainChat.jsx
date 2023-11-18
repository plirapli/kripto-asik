import {
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';
import { getContacts } from '../contacts';

export default function MainChat() {
  const { contacts } = useLoaderData();
  const navigation = useNavigation();

  return (
    <>
      <div id='sidebar'>
        <h1>React Router Contacts</h1>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`chat/${contact.username}`}
                    className={({ isActive, isPending }) =>
                      isActive ? 'active' : isPending ? 'pending' : ''
                    }
                  >
                    {contact.username}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id='detail'
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
    </>
  );
}

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}
