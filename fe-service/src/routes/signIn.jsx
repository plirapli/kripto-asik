import { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

// Components
// import Button from '../../components/buttons/Button';
// import { Input } from '../../components/form';
// import { OverlayLoading } from '../../components/overlay';
// import { getUserOwnProfile } from '../../utils/user';

const SignIn = () => {
  const initialState = { email: '', password: '' };
  // const { setProfile } = useProfile();
  // const [error, setError] = useOutletContext();
  const [inputData, setInputData] = useState(initialState);
  // const [isLoading, setIsLoading] = useState(false);

  const inputHandler = (e, key) => {
    setInputData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  // // Submit process
  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   setIsLoading(true);
  //   sendLogin(inputData)
  //     .then((data) => {
  //       const { token } = data;
  //       // Reset state
  //       // setError({});
  //       setInputData(initialState);

  //       // Store token to State && Local Storage
  //       localStorage.setItem('user', JSON.stringify({ token }));

  //       // Get user data
  //       getUserOwnProfile()
  //         .then((data) => {
  //           setProfile({ ...data });
  //           window.location.replace('/');
  //         })
  //         .catch((err) => console.log(err));
  //     })
  //     .catch((err) =>
  //       setError({
  //         status: err.status,
  //         msg: err.message,
  //       })
  //     )
  //     .finally(() => setIsLoading(false));
  // };

  // useEffect(() => {
  //   if (error.status == 400) setError({ status: '', mesg: '' });
  // }, []);

  return (
    <div className='flex bg-gray-100'>
      <div className='py-5 px-6 mt-5 bg-white rounded-lg shadow'>
        <h1 className='inline text-2xl font-semibold leading-none'>Login</h1>
        <hr className='my-4' />

        <div>
          <input
            type='text'
            placeholder='Username'
            className='mt-2 form-input'
          />
          <input
            type='password'
            placeholder='Passwords'
            className='mt-2.5 form-input'
          />
        </div>
        <hr className='my-4' />

        <button type='button' className='mt-4 w-full button-black'>
          <span className='w-full'>Sign in</span>
        </button>
        <button type='button' className='mt-2 w-full button-secondary'>
          <span className='w-full'>Sign up</span>
        </button>
      </div>
    </div>
  );
};

export default SignIn;
