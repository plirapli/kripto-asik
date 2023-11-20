import { Route, Routes } from 'react-router-dom';
import ErrorPage from './error-page';
import MainChat from './mainChat';
import Chat from './chat';
import SignIn from './signIn';
import SignUp from './signUp';
import FileUpload from './fileUpload';
import FileOpen from './fileOpen';

const Root = () => {
  return (
    <div className='min-h-screen px-4 bg-gray-100 w-full flex justify-center'>
      <div className='flex flex-col w-full max-w-screen-md min-h-full'>
        <Routes>
          <Route path='/login' element={<SignIn />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/' element={<MainChat />}>
            <Route index element={<Chat />} />
            <Route path='file-upload' element={<FileUpload />} />
            <Route path='file-open' element={<FileOpen />} />
          </Route>
          <Route path='/error-404' element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Root;
