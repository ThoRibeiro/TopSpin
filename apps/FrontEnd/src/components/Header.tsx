import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">Association</div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/news">Actualités</Link></li>
          <li><Link to="/events">Événements</Link></li>
          <li><Link to="/gallery">Galerie</Link></li>
          <li><Link to="/resources">Ressources</Link></li>
          <li><Link to="/about">À propos</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
