import React from "react";
import "./CardPopup.css";
import { PopupProps } from "../../../data/interfaces/Article.ts";

interface CardPopupProps extends PopupProps {
  openForm: () => void;
}

const Popup: React.FC<CardPopupProps> = ({ article, onClose, openForm }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-left">
          <h2>{article.title}</h2>
          <p>{article.content}</p>
          {article.status !== "fermé" && (
            <button onClick={openForm} className="register-button">
              S'inscrire à l'événement
            </button>
          )}
        </div>
        <div className="popup-right">
          <img src={article.images} alt="Article" />
        </div>
      </div>
    </div>
  );
};

export default Popup;
