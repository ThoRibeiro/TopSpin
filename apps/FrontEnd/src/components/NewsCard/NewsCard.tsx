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

  const openPopup = (article: Article) => {
    setSelectedArticle(article);
  };

  const closePopup = () => {
    setSelectedArticle(null);
  };

  return (
    <>
      <div className="news-card" onClick={() => openPopup(article)}>
        <img src={article.image} alt="Article" />
        <div className="news-card-content">
          <h2>{truncateText(article.titlePost, 110)}</h2>
          <p>{truncateText(article.content, 110)}</p>
          <div className="news-card-author">
            {article.member.image && (
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
