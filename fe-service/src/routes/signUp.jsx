import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postRegister } from '../utils/auth';

const SignUp = () => {
  const initialState = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
  };
  const [info, setInfo] = useState({});
  const [inputData, setInputData] = useState(initialState);
  // const [isLoading, setIsLoading] = useState(false);

  // Submit process
  const submitHandler = (e) => {
    e.preventDefault();
    const { name, username, password, confirmPassword } = inputData;

    if (password === confirmPassword) {
      postRegister({ name, username, password })
        .then((data) => {
          setInputData({ ...initialState });
          setInfo({ ...data });
        })
        .catch((err) => {
          setInfo({ ...err });
        });
    } else {
      setInfo({
        status: 'Error',
        message: 'Password unmatch.',
      });
    }
  };

  return (
    <div className='min-h-screen sm:p-6 flex sm:justify-center sm:items-center'>
      <div className='sm:max-w-sm flex bg-gray-100'>
        <div className='py-5 px-6 bg-white rounded-lg shadow'>
          <h1 className='inline text-2xl font-semibold leading-none'>
            Register
          </h1>
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
                  setInputData((prev) => ({ ...prev, name: e.target.value }))
                }
                value={inputData.name}
                placeholder='Full Name'
                className='mt-2 form-input'
                required
              />
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
              <input
                onChange={(e) =>
                  setInputData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                value={inputData.confirmPassword}
                type='password'
                placeholder='Configm Password'
                className='mt-2.5 form-input'
                required
              />
            </div>
            <hr className='my-4' />
            <button type='submit' className='mt-4 w-full button-black'>
              <span className='w-full'>Register</span>
            </button>
            <Link to='/login'>
              <button type='button' className='mt-2 w-full button-secondary'>
                <span className='w-full'>Login</span>
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
