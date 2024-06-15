import React, { useState, useEffect } from "react";
import { getAllPosts, updatePost } from "../../services/postService.ts";
import "./AdminPanel.css";

interface Post {
  _id: string;
  titlePost: string;
  content: string;
  member: string;
}

const AdminPanel: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        setPosts(response.data);
      } catch (err) {
        setError("Erreur lors de la récupération des posts.");
      }
    };

    fetchPosts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string,
  ) => {
    const { name, value } = e.target;
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === id ? { ...post, [name]: value } : post,
      ),
    );
  };

  const handleUpdatePost = async (post: Post) => {
    try {
      const formData = new FormData();
      formData.append("idPost", post._id);
      formData.append("titlePost", post.titlePost);
      formData.append("content", post.content);
      formData.append("memberId", post.member);

      await updatePost(post._id, formData);
      alert("Post mis à jour avec succès.");
    } catch (err) {
      setError("Erreur lors de la mise à jour du post.");
    }
  };

  return (
    <div className="admin-panel">
      <h1>Gestion des posts</h1>
      {error && <p className="error">{error}</p>}
      {posts.map((post) => (
        <div key={post._id} className="post">
          <div className="form-group">
            <label>Titre:</label>
            <input
              type="text"
              name="titlePost"
              value={post.titlePost}
              onChange={(e) => handleInputChange(e, post._id)}
            />
          </div>
          <div className="form-group">
            <label>Contenu:</label>
            <textarea
              name="content"
              value={post.content}
              onChange={(e) => handleInputChange(e, post._id)}
            />
          </div>
          <button onClick={() => handleUpdatePost(post)}>Mettre à jour</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
