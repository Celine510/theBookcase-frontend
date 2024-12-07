import TablerMenuDeep from '@/components/icons/TablerMenuDeep';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className="absolute top-10 left-10">
        <button className="text-l">
          <TablerMenuDeep />
        </button>
      </div>

      <div className="absolute top-10 right-10">
        <Link className="uppercase text-xl ff-second" to="/login">
          Login
        </Link>
      </div>
    </>
  );
};

export default Header;
