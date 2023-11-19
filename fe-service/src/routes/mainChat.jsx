import { Link, NavLink, Outlet, useNavigation } from 'react-router-dom';
import { getContacts } from '../utils/contacts';

export default function MainChat() {
  const contacts = getContacts();

  // const navigation = useNavigation();

  return (
    <>
      <div className='flex items-end gap-2 mt-4 mb-2'>
        <div className='w-full'>
          <div className='text-gray-400 text-sm'>Hello,</div>
          <h1 className='inline text-lg font-bold leading-none'>
            Nama User 😋
          </h1>
        </div>
        <Link
          to='/login'
          className='min-w-fit underline text-black text-opacity-40'
        >
          Sign out
        </Link>
      </div>
      <ul className='grid grid-flow-col text-center font-medium text-black text-opacity-30 bg-gray-200 rounded-lg p-1'>
        <li>
          <NavLink
            to='/'
            end
            className={({ isActive, isPending }) =>
              isPending ? '' : isActive ? 'tab tab-active' : 'tab tab-inactive'
            }
          >
            Chat
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/file-upload'
            end
            className={({ isActive, isPending }) =>
              isPending ? '' : isActive ? 'tab tab-active' : 'tab tab-inactive'
            }
          >
            File Upload
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/file-open'
            end
            className={({ isActive, isPending }) =>
              isPending ? '' : isActive ? 'tab tab-active' : 'tab tab-inactive'
            }
          >
            Open File
          </NavLink>
        </li>
      </ul>
      <div className='flex-1 flex flex-col px-1' id='detail'>
        <Outlet />
      </div>
    </>
  );
}
