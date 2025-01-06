import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import router from './router/index';
import { RouterProvider } from 'react-router-dom';
import '@/assets/styles/common.css';
import '@/assets/styles/index.css';

import MessageAlert from './components/MessageAlert';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MessageAlert />
    <RouterProvider router={router} />
  </StrictMode>,
);
