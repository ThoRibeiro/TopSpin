import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postService.ts";
import "./ArticleSection.css";
import article1 from "../../assets/article1.jpg";
import logoArticle from "../../assets/logo-article.jpeg";
import Popup from "../Popup/CardPopup.tsx";

interface Article {
  titlePost: string;
  content: string;
  image: string;
  member: {
    firstname: string;
    lastname: string;
    image: string;
  };
}

const ArticleSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getAllPosts();
        const posts: Article[] = response.data;
        if (posts.length > 3) {
          setArticles(posts.slice(3, 9)); // Prenez les articles à partir du 4ème jusqu'au 9ème
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
    return <div>Chargement...</div>;
  }

  if (articles.length === 0) {
    return <div>Pas d'articles trouvés désolé...</div>;
  }

  return (
    <section className="article-section">
      <h2>Blog</h2>
      <div className="article-cards">
        {articles.map((article, index) => (
          <div
            className="article-card"
            key={index}
            onClick={() => openPopup(article)}
          >
            <img src={article.image || article1} alt={article.titlePost} />
            <div className="article-card-content">
              <h3>{truncateText(article.titlePost, 110)}</h3>
              <p>{truncateText(article.content, 110)}</p>
              <div className="author-info">
                <img
                  src={article.member.image || logoArticle}
                  alt={article.member.firstname}
                />
                <span>{`${article.member.firstname} ${article.member.lastname}`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedArticle && (
        <Popup article={selectedArticle} onClose={closePopup} />
      )}
    </section>
  );
};

export default ArticleSection;
