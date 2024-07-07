import React, { useEffect, useState } from "react";
import "./News.css";
import NewsCard from "../../components/NewsCard/NewsCard";
import { Article } from "../../data/interfaces/Article";

const News: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    setArticles([
      {
        id: 1,
        title: "Résultat du match A",
        content: "Contenu de l'article A",
        image: "image-a.jpg",
        member: {
          firstname: "John",
          lastname: "Doe",
          image: "author-a.jpg",
        },
      },
      {
        id: 2,
        title: "Annonce importante B",
        content: "Contenu de l'article B",
        image: "image-b.jpg",
        member: {
          firstname: "Jane",
          lastname: "Smith",
          image: "author-b.jpg",
        },
      },
      {
        id: 3,
        title: "Nouvelle C",
        content: "Contenu de l'article C",
        image: "image-c.jpg",
        member: {
          firstname: "Alice",
          lastname: "Brown",
          image: "author-c.jpg",
        },
      },
      {
        id: 4,
        title: "Nouvelle D",
        content: "Contenu de l'article D",
        image: "image-d.jpg",
        member: {
          firstname: "Bob",
          lastname: "Davis",
          image: "author-d.jpg",
        },
      },
      {
        id: 5,
        title: "Nouvelle E",
        content: "Contenu de l'article E",
        image: "image-e.jpg",
        member: {
          firstname: "Charlie",
          lastname: "Wilson",
          image: "author-e.jpg",
        },
      },
    ]);
  }, []);

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
