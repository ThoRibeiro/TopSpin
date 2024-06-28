import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.webp";
import instagramLogo from "../../assets/instagram.svg";
import xLogo from "../../assets/x-twitter.svg";
import facebookLogo from "../../assets/facebook.svg";
import linkedinLogo from "../../assets/linkedin.svg";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <a href="/">
            <img src={logo} alt="Association Logo" />
            <h1>TopSpin Lille</h1>
          </a>
        </div>
        <ul className="footer-links">
          <li><a href="/">Accueil</a></li>
          <li><a href="/news">Actualités</a></li>
          <li><a href="/gallery">Galerie</a></li>
          <li><a href="/about">À propos</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        <div className="footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagramLogo} alt="Instagram" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={facebookLogo} alt="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={xLogo} alt="Twitter" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src={linkedinLogo} alt="LinkedIn" />
          </a>
        </div>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Association de Tennis de Table de Lille. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
