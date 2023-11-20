import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Root from './routes/root';
import './index.css';
import { ProfileProvider } from './context/ProfileProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProfileProvider>
        <Root />
      </ProfileProvider>
    </BrowserRouter>
  </React.StrictMode>
);
