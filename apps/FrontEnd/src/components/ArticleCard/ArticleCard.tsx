import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../services/Admin/postService";
import "./ArticleCard.css";
import Popup from "../Popup/Card/CardPopup";
import { Article } from "../../data/interfaces/Article.ts";

const ArticleCard: React.FC = () => {
  const [latestArticle, setLatestArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchLatestArticle = async () => {
      try {
        const response = await getAllPosts();
        const posts: Article[] = response.data;
        if (posts.length > 0) {
          setLatestArticle(posts[0]);
        }
      } catch (error) {
        console.error("Error fetching the latest article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestArticle();
  }, []);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!latestArticle) {
    return <div>No articles found</div>;
  }

  return (
    <>
      <div className="article-card" onClick={() => openPopup(latestArticle)}>
        <div className="article-image">
          <img src={latestArticle.image} alt="Article" />
        </div>
        <div className="article-content">
          <h2>{truncateText(latestArticle.titlePost, 110)}</h2>
          <p>{truncateText(latestArticle.content, 110)}</p>
          <div className="article-author">
            {latestArticle.member?.image && (
              <img src={latestArticle.member.image} alt="Author" />
            )}
            <span>
              {latestArticle.member.firstname} {latestArticle.member.lastname}
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

export default ArticleCard;
