import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../services/postService.ts';
import './SideArticleCard.css';

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

const SideArticleCard: React.FC = () => {
  const [sideArticles, setSideArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getAllPosts();
        const posts: Article[] = response.data;
        if (posts.length > 1) {
          setSideArticles(posts.slice(1, 3)); // Prenez les 2ème et 3ème articles
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
    return <div>Loading...</div>;
  }

  if (sideArticles.length === 0) {
    return <div>No articles found</div>;
  }

  return (
    <div className="side-articles">
      {sideArticles.map((article, index) => (
        <div key={index} className="side-article-card">
          <img src={article.image} alt="Article" />
          <div className="side-article-content">
            <h2>{article.titlePost}</h2>
            <p>{article.content}</p>
            <div className="side-article-author">
              <img src={article.member.image} alt="Author" />
              <span>{`${article.member.firstname} ${article.member.lastname}`}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideArticleCard;
