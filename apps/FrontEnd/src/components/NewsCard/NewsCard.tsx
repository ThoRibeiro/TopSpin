import React, { useState } from "react";
import "./NewsCard.css";
import Popup from "../Popup/Card/CardPopup";
import EventRegistrationForm from "../EventRegistrationForm/EventRegistrationForm";
import { Article } from "../../data/interfaces/Article";

interface NewsCardProps {
  article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  const truncateText = (text: string, maxLength: number) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text || "";
  };

  const openPopup = (article: Article) => {
    setSelectedArticle(article);
  };

  const closePopup = () => {
    setSelectedArticle(null);
  };

  const openForm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <div className="article-card" onClick={() => openPopup(article)}>
        <img src={article.image} alt={article.titlePost || "Article"} />
        <div className="article-card-content">
          <h3>{truncateText(article.titlePost, 110)}</h3>
          <p>{truncateText(article.content, 110)}</p>
          <div className="author-info">
            {article.member?.image && (
              <img
                src={article.member.image}
                alt={article.member.firstname || "Author"}
              />
            )}
            <span>{`${article.member?.firstname || ""} ${article.member?.lastname || ""}`}</span>
          </div>
          <button onClick={openForm} className="register-button">S'inscrire à l'événement</button>
        </div>
      </div>
      {selectedArticle && (
        <Popup article={selectedArticle} onClose={closePopup} />
      )}
      {showForm && (
        <EventRegistrationForm onClose={closeForm} />
      )}
    </>
  );
};

export default NewsCard;
