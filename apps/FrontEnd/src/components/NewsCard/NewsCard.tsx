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

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <div className="article-card" onClick={() => openPopup(article)}>
        <img src={article.images} alt={article.title || "Article"} />
        <div className="article-card-content">
          <h3>{truncateText(article.title, 110)}</h3>
          <p>{truncateText(article.content, 110)}</p>
        </div>
      </div>
      {selectedArticle && (
        <Popup
          article={selectedArticle}
          onClose={closePopup}
          openForm={openForm}
        />
      )}
      {showForm && (
        <EventRegistrationForm eventId={article._id} onClose={closeForm} />
      )}
    </>
  );
};

export default NewsCard;
