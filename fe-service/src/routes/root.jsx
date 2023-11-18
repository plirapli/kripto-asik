import { Route, Routes } from 'react-router-dom';
import ErrorPage from '../assets/error-page';
import Index from '.';
import MainChat, { loader as mainChatLoader } from './mainChat';
import Chat, { loader as chatLoader } from './chat';
import SignIn from './signIn';

const Root = () => {
  return (
    <div className='min-h-screen bg-gray-100 w-full'>
      <div className='min-h-screen sm:p-6 flex sm:justify-center sm:items-center'>
        <Routes>
          <Route path='/login' element={<SignIn />} />
          {/* <Route path='/register' element={<SignUp />} /> */}
          <Route
            path='/'
            element={<MainChat />}
            loader={mainChatLoader}
            errorElement={<ErrorPage />}
          >
            <Route errorElement={<ErrorPage />}>
              <Route index element={<Index />} />
              <Route
                path='chat/:username'
                element={<Chat />}
                loader={chatLoader}
              />
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Root;
