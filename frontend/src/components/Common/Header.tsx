import React from 'react';
import { Link } from 'react-router-dom';
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
            <Link to="/create-publication" className="nav-link">Crear Publicación</Link>
          </li>
          <li className="nav-item">
            <Link to="/edit-profile" className="nav-link">Editar Perfil</Link>
          </li>
          <li className="nav-item">
            <Link to="/logout" className="nav-link">Logout</Link>
          </li>
          <li className="nav-item">
            <Link to="/own-posts" className="nav-link">My Posts</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
