import { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

const SignIn = () => {
  const initialState = { username: '', password: '' };
  // const { setProfile } = useProfile();
  // const [error, setError] = useOutletContext();
  const [inputData, setInputData] = useState(initialState);
  // const [isLoading, setIsLoading] = useState(false);

  // Submit process
  const submitHandler = (e) => {
    e.preventDefault();

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
  };

  // useEffect(() => {
  //   if (error.status == 400) setError({ status: '', mesg: '' });
  // }, []);

  return (
    <div className='sm:max-w-sm flex bg-gray-100'>
      <div className='py-5 px-6 bg-white rounded-lg shadow'>
        <h1 className='inline text-2xl font-semibold leading-none'>Login</h1>
        <hr className='my-4' />
        <form onSubmit={submitHandler}>
          <div>
            <input
              type='text'
              onChange={(e) =>
                setInputData((prev) => ({ ...prev, username: e.target.value }))
              }
              value={inputData.username}
              placeholder='Username'
              className='mt-2 form-input'
            />
            <input
              onChange={(e) =>
                setInputData((prev) => ({ ...prev, password: e.target.value }))
              }
              value={inputData.password}
              type='password'
              placeholder='Passwords'
              className='mt-2.5 form-input'
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
  );
};

export default SignIn;
