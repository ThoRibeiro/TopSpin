import React, { useEffect, useState } from "react";
import "./News.css";
import NewsCard from "../../components/NewsCard/NewsCard";
import { Article } from "../../data/interfaces/Article";
import eventService from "../../services/eventService";

const News: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await eventService.getAllEvents(); // Utiliser getAllEvents
        setArticles(response.data);
      } catch (error) {
        setError("Erreur lors de la récupération des articles");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="news">
      <h1>Actualités</h1>
      <div className="articles">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
};

export default News;
