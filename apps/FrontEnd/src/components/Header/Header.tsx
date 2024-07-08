import React from "react";
import "./Header.css";
import logo from "../../assets/logo.webp";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { isAuthenticated, isAdminPage } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">
            <img src={logo} alt="Ping Pong Lille" />
          </a>
        </div>
        <nav className="navbar-links">
          {isAuthenticated && isAdminPage ? (
            <>
              <Link to="/admin/manage-posts">Posts</Link>
              <Link to="/admin/manage-member">Membres</Link>
              <Link to="/admin/manage-event">Évènements</Link>
              <Link to="/admin/manage-gallery">Galeries</Link>
              <Link to="/admin/manage-contact">Contacts</Link>
            </>
          ) : (
            <>
              <Link to="/">Accueil</Link>
              <Link to="/news">Actualités</Link>
              <Link to="/gallery">Galerie</Link>
              <Link to="/about">À propos</Link>
              <Link to="/contact">Contact</Link>
            </>
          )}
        </nav>
        <div className="navbar-icons"></div>
      </div>
    </header>
  );
};

export default Header;
