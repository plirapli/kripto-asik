import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { parseJwt, postLogin } from '../utils/auth';
import { useProfile } from '../hooks/profile';

const SignIn = () => {
  const initialState = { username: '', password: '' };
  const { setProfile } = useProfile();
  const [info, setInfo] = useState({});
  const [inputData, setInputData] = useState(initialState);
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);

  // Submit process
  const submitHandler = (e) => {
    e.preventDefault();
    const { username, password } = inputData;
    postLogin({ username, password })
      .then((data) => {
        const { token, status, message } = data;
        setInputData({ ...initialState });
        setInfo({ status, message });

        // Store token to Local Storage
        localStorage.setItem('access_token', token);
        setProfile({ ...parseJwt(token) });

        navigate('/', { replace: true });
      })
      .catch((err) => {
        setInfo({ ...err });
      });
  };

  // useEffect(() => {
  //   if (error.status == 400) setError({ status: '', mesg: '' });
  // }, []);

  return (
    <div className='min-h-screen sm:p-6 flex sm:justify-center sm:items-center'>
      <div className='w-full sm:max-w-sm flex bg-gray-100'>
        <div className='pt-16 sm:pt-5 w-full py-5 px-6 bg-white rounded-lg shadow'>
          <h1 className='inline text-2xl font-semibold leading-none'>Login</h1>
          <hr className='mt-4 mb-2' />
          {info.message && (
            <div
              type='button'
              className={`mt-4 mb-1 px-2.5 py-1.5 w-full text-sm rounded-md ${
                info.status == 'Error'
                  ? 'text-red-400 bg-red-50 border border-red-400'
                  : 'text-green-400 bg-green-50 border border-green-400'
              }`}
            >
              {info.message}
            </div>
          )}
          <form onSubmit={submitHandler}>
            <div>
              <input
                type='text'
                onChange={(e) =>
                  setInputData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                value={inputData.username}
                placeholder='Username'
                className='mt-2 form-input'
                required
              />
              <input
                onChange={(e) =>
                  setInputData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                value={inputData.password}
                type='password'
                placeholder='Passwords'
                className='mt-2.5 form-input'
                required
              />
            </div>
            <hr className='my-4' />
            <button type='submit' className='mt-4 w-full button-black'>
              <span className='w-full'>Login</span>
            </button>
            <Link to='/register'>
              <button type='button' className='mt-2 w-full button-secondary'>
                <span className='w-full'>Register</span>
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
