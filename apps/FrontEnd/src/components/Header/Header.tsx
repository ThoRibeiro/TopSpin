// Header.tsx
import React from 'react';
import './Header.css';
import logo from '../../assets/logo.webp'; // Assurez-vous que le logo est dans le bon répertoire

const Header: React.FC = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="Ping Pong Lille" />
        </div>
        <nav className="navbar-links">
          <a href="/">Accueil</a>
          <a href="/actualites">Actualités</a>
          <a href="/galery">Galerie</a>
          <a href="/about">À propos</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="navbar-icons">
        </div>
      </div>
    </header>
  );
}

export default Header;
