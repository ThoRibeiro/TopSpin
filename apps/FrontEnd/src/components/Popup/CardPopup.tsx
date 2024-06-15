// Popup.tsx
import React from "react";
import "./CardPopup.css";

interface PopupProps {
  article: any;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ article, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-left">
          <h2>{article.titlePost}</h2>
          <p>{article.content}</p>
          <div className="article-author">
            {article.member?.image && (
              <img src={article.member.image} alt="Author" />
            )}
            <span>
              {article.member.firstname} {article.member.lastname}
            </span>
          </div>
        </div>
        <div className="popup-right">
          <img src={article.image} alt="Article" />
        </div>
      </div>
    </div>
  );
};

export default Popup;
