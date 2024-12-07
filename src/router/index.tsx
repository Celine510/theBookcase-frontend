import Home from '@/pages/Home';
import Layout from '@/pages/Layout';
import Login from '@/pages/Login';
import QuoteOcean from '@/pages/QuoteOcean';
import QuotePool from '@/pages/QuotePool';
import Signup from '@/pages/Signup';
import User from '@/pages/User';

import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/user',
        element: <User />,
      },
      {
        path: '/quoteocean',
        element: <QuoteOcean />,
      },
      {
        path: '/quotepool',
        element: <QuotePool />,
      },
    ],
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
