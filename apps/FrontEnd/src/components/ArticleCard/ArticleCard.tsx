import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postService.ts";
import "./ArticleCard.css";

const ArticleCard: React.FC = () => {
  const [latestArticle, setLatestArticle] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLatestArticle = async () => {
      try {
        const response = await getAllPosts();
        const posts = response.data;
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!latestArticle) {
    return <div>No articles found</div>;
  }

  return (
    <div className="article-card">
      <div className="article-image">
        <img src={latestArticle.image} alt="Article" />
      </div>
      <div className="article-content">
        <h2>{latestArticle.titlePost}</h2>
        <p>{latestArticle.content}</p>
        <div className="article-author">
          {latestArticle.member?.image && (
            <img src={latestArticle.member.image} alt="Author" />
          )}
          <span>
            Écrit par {latestArticle.member.firstname},{" "}
            {latestArticle.member.lastname}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
