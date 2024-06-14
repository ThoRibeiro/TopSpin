import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} Association de Tennis de Table de
          Lille. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
