import TablerMenuDeep from '@/components/icons/TablerMenuDeep';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className="flex justify-between items-center w-[100%] absolute top-6">
        <button className="text-l pl-6">
          <TablerMenuDeep />
        </button>
        <Link className="uppercase text-l ff-second pr-6" to="/login">
          Login
        </Link>
      </div>
    </>
  );
};

export default Header;
