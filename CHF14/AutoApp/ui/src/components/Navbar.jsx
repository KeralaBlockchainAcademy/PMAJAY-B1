import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'; // Import Home icon

const Navbar = () => {
  return (
    <div className="bg-blue-500 text-blue-950 h-16 flex items-center justify-center shadow-md">
      <Link to="/">
        <FontAwesomeIcon icon={faHome} className="text-3xl hover:text-yellow-600" />
      </Link>
    </div>
  );
};

export default Navbar;
