import React, { useState } from "react";
import "./NewsCard.css";
import Popup from "../Popup/Card/CardPopup";
import { Article } from "../../data/interfaces/Article";

interface NewsCardProps {
  article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const openPopup = () => {
    setSelectedArticle(article);
  };

  const closePopup = () => {
    setSelectedArticle(null);
  };

  return (
    <>
      <div className="news-card" onClick={openPopup}>
        <div className="news-image">
          <img src={article.image} alt="Article" />
        </div>
        <div className="news-content">
          <h2>{truncateText(article.title, 110)}</h2>
          <p>{truncateText(article.content, 110)}</p>
          <div className="news-author">
            {article.member?.image && (
              <img src={article.member.image} alt="Author" />
            )}
            <span>
              {article.member.firstname} {article.member.lastname}
            </span>
          </div>
        </div>
      </div>
      {selectedArticle && (
        <Popup article={selectedArticle} onClose={closePopup} />
      )}
    </>
  );
};

export default NewsCard;
