import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Outlet />
      <Header />
    </>
  );
};

export default Layout;
