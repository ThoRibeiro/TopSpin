import React, { useEffect, useState } from "react";
import "./News.css";

const News: React.FC = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles([
      {
        id: 1,
        title: "Résultat du match A",
        content: "Contenu de l'article A",
      },
      {
        id: 2,
        title: "Annonce importante B",
        content: "Contenu de l'article B",
      },
    ]);
  }, []);

  return (
    <main className="news">
      <h1>Actualités</h1>
      <div className="articles">
        {articles.map((article) => (
          <div key={article.id} className="article">
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default News;
