import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useProfile } from '../hooks/profile';
import { useEffect } from 'react';
import { autoSignIn, logout } from '../utils/auth';

export default function MainChat() {
  const { profile, setProfile } = useProfile();
  const navigate = useNavigate();
  const logoutHandler = () => {
    setProfile({});
    logout();
    return navigate('/login', { replace: true });
  };

  useEffect(() => {
    if (!profile.username) {
      autoSignIn()
        .then(({ data }) => setProfile({ ...data }))
        .catch((err) => {
          if (err.response) return navigate('/login', { replace: true });
          else return navigate('/error-404', { replace: true });
        });
    }
  }, [profile.username]);

  if (profile.username)
    return (
      <div className='px-3 flex flex-col w-full min-h-full'>
        <div className='flex items-end gap-2 mt-4 mb-2'>
          <div className='w-full'>
            <div className='text-gray-400 text-sm'>Hello,</div>
            <h1 className='inline text-lg font-bold leading-none'>
              {profile.name} 😋
            </h1>
          </div>
          <a
            onClick={logoutHandler}
            className='min-w-fit underline text-black text-opacity-40 cursor-pointer'
          >
            Sign out
          </a>
        </div>
        <ul className='grid grid-flow-col text-center font-medium text-black text-opacity-30 bg-gray-200 rounded-lg p-1'>
          <li>
            <NavLink
              to='/'
              end
              className={({ isActive, isPending }) =>
                isPending
                  ? ''
                  : isActive
                  ? 'tab tab-active'
                  : 'tab tab-inactive'
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
                isPending
                  ? ''
                  : isActive
                  ? 'tab tab-active'
                  : 'tab tab-inactive'
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
                isPending
                  ? ''
                  : isActive
                  ? 'tab tab-active'
                  : 'tab tab-inactive'
              }
            >
              Open File
            </NavLink>
          </li>
        </ul>
        <div className='flex-1 flex flex-col' id='detail'>
          <Outlet />
        </div>
      </div>
    );
}
