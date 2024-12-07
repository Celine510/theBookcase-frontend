import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import router from './router/index';
import { RouterProvider } from 'react-router-dom';
import '@/assets/styles/common.css'
import '@/assets/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
