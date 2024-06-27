import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../services/Admin/postService";
import "./SideArticleCard.css";
import Popup from "../Popup/Card/CardPopup";
import { Article } from "../../data/interfaces/Article.ts";

const SideArticleCard: React.FC = () => {
  const [sideArticles, setSideArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getAllPosts();
        const posts: Article[] = response.data;
        if (posts.length > 1) {
          setSideArticles(posts.slice(1, 3));
        }
      } catch (error) {
        console.error("Error fetching the articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
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

  if (sideArticles.length === 0) {
    return <div>No articles found</div>;
  }

  return (
    <>
      <div className="side-articles">
        {sideArticles.map((article, index) => (
          <div
            key={index}
            className="side-article-card"
            onClick={() => openPopup(article)}
          >
            <img src={article.image} alt="Article" />
            <div className="side-article-content">
              <h2>{truncateText(article.titlePost, 110)}</h2>
              <p>{truncateText(article.content, 110)}</p>
              <div className="side-article-author">
                {article.member.image && (
                  <img src={article.member.image} alt="Author" />
                )}
                <span>
                  {article.member.firstname} {article.member.lastname}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedArticle && (
        <Popup article={selectedArticle} onClose={closePopup} />
      )}
    </>
  );
};

export default SideArticleCard;
