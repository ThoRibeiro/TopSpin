import React, { useState, useEffect } from "react";
import postService from "../../../services/Admin/postService.ts";
import "./ManagePosts.css";
import { useAuth } from "../../../Context/AuthContext";
import AddPostPopin from "../../../components/Popup/Post/AddPost";
import EditPostPopin from "../../../components/Popup/Post/EditPost";
import {
  notifySuccess,
  notifyError,
} from "../../../components/Toast/ToastNotification";
import { Post } from "../../../data/interfaces/Post";

const ManagePosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showAddPostPopin, setShowAddPostPopin] = useState(false);
  const [showEditPostPopin, setShowEditPostPopin] = useState(false);
  const { setIsAdminPage, isAuthenticated } = useAuth();

  useEffect(() => {
    setIsAdminPage(true);
    return () => {
      setIsAdminPage(false);
    };
  }, [setIsAdminPage]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getAllPosts();
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        notifyError("Erreur lors de la récupération des posts.");
      }
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (post: Post) => {
    setEditingPost(post);
    setShowEditPostPopin(true);
  };

  const handleSaveClick = async (postData: FormData) => {
    if (editingPost) {
      try {
        await postService.updatePost(editingPost._id, postData);
        const response = await postService.getAllPosts();
        setPosts(response.data);
        setEditingPost(null);
        notifySuccess("Post mis à jour avec succès.");
      } catch (error) {
        console.error("Error updating post:", error);
        notifyError("Erreur lors de la mise à jour du post.");
      }
    } else {
      try {
        await postService.createPost(postData);
        const response = await postService.getAllPosts();
        setPosts(response.data);
        notifySuccess("Post ajouté avec succès.");
      } catch (error) {
        console.error("Error adding post:", error);
        notifyError("Erreur lors de l'ajout du post.");
      }
    }
    setShowAddPostPopin(false);
    setShowEditPostPopin(false);
  };

  const handleDeleteClick = async (_id: string) => {
    if (isAuthenticated) {
      try {
        await postService.deletePost(_id);
        setPosts(posts.filter((post) => post._id !== _id));
        notifySuccess("Post supprimé avec succès.");
      } catch (error) {
        console.error("Error deleting post:", error);
        notifyError("Erreur lors de la suppression du post.");
      }
    } else {
      notifyError("Vous devez être connecté pour effectuer cette action.");
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.titlePost.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const truncateDescription = (description: string) => {
    return description.length > 100 ? description.substring(0, 70) + "..." : description;
  };

  return (
    <div className="manage-posts">
      <h1>Gérer les posts</h1>
      <div className="search-add-container">
        <input
          type="text"
          placeholder="Rechercher par titre"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="add-post-button" onClick={() => setShowAddPostPopin(true)}>
          Créer un nouveau post
        </button>
      </div>
      <table>
        <thead>
        <tr>
          <th className="title-table">Titre</th>
          <th className="content-table">Description</th>
          <th>Catégorie</th>
          <th>Auteur</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {filteredPosts.map((post) => (
          <tr key={post._id}>
            <td>{post.titlePost}</td>
            <td>{truncateDescription(post.content)}</td>
            <td>{post.categorie}</td>
            <td>{post.member ? `${post.member.firstname} ${post.member.lastname}` : "Inconnu"}</td>
            <td className="actions">
              <button className="edit-button" onClick={() => handleEditClick(post)}>
                Modifier
              </button>
              <button className="delete-button" onClick={() => handleDeleteClick(post._id)}>
                Supprimer
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <AddPostPopin
        show={showAddPostPopin}
        onClose={() => setShowAddPostPopin(false)}
        onSave={handleSaveClick}
      />
      <EditPostPopin
        show={showEditPostPopin}
        onClose={() => setShowEditPostPopin(false)}
        onSave={handleSaveClick}
        post={editingPost!}
      />
    </div>
  );
};

export default ManagePosts;
