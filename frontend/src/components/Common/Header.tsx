import { Link } from 'react-router-dom';
import Logout from '../Logout/Logout';
import '../../assets/styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/create-publication" className="nav-link">New Post</Link>
          </li> 
          <li className="nav-item">
            <Link to="/my-publications" className="nav-link">My Posts</Link>
          </li>
          <li className="nav-item">
            <Link to="/edit-profile" className="nav-link">Edit Profile</Link>
          </li>
          <li className="nav-item">
            <Link to="/list-users" className="nav-link">List Users</Link>
          </li>
          <li className="nav-item">
            <Link to="/list-publications" className="nav-link">Delete Posts</Link>
          </li>
          <li className="nav-item">
            <Logout /> 
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
