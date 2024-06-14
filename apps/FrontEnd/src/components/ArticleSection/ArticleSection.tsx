import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../services/postService.ts';
import './ArticleSection.css';
import article1 from "../../assets/article1.jpg";
import logoArticle from "../../assets/logo-article.jpeg";

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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getAllPosts();
        const posts: Article[] = response.data;
        if (posts.length > 3) {
          setArticles(posts.slice(3, 9)); // Prenez les articles à partir du 4ème jusqu'au 9ème
        }
      } catch (error) {
        console.error('Error fetching the articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

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
          <div className="article-card" key={index}>
            <img src={article.image || article1} alt={article.titlePost} />
            <div className="article-card-content">
              <h3>{article.titlePost}</h3>
              <p>{article.content}</p>
              <div className="author-info">
                <img src={article.member.image || logoArticle} alt={article.member.firstname} />
                <span>{`${article.member.firstname} ${article.member.lastname}`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ArticleSection;
