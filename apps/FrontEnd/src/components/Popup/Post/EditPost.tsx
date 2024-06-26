import React, { useState, useEffect, useRef } from "react";
import "./EditPost.css";

interface Post {
  _id: string;
  titlePost: string;
  content: string;
  categorie: string;
  image: string;
}

interface EditPostPopinProps {
  show: boolean;
  onClose: () => void;
  onSave: (post: FormData) => void;
  post: Post | null;
}

const EditPostPopin: React.FC<EditPostPopinProps> = ({
  show,
  onClose,
  onSave,
  post,
}) => {
  const [titlePost, setTitlePost] = useState("");
  const [content, setContent] = useState("");
  const [categorie, setCategorie] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (post) {
      setTitlePost(post.titlePost);
      setContent(post.content);
      setCategorie(post.categorie);
      if (post.image) {
        setImagePreview(post.image);
      }
    } else {
      setTitlePost("");
      setContent("");
      setCategorie("");
      setImages([]);
      setImagePreview(null);
    }
  }, [post]);

  const handleSave = () => {
    const formData = new FormData();
    formData.append("titlePost", titlePost);
    formData.append("content", content);
    formData.append("categorie", categorie);
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("idPost", post?._id || ""); // Append post ID
    onSave(formData);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImages(Array.from(e.target.files));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <h2>Modifier le Post</h2>
        <label>
          Titre:
          <input
            type="text"
            value={titlePost}
            onChange={(e) => setTitlePost(e.target.value)}
          />
        </label>
        <label>
          Contenu:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </label>
        <label>
          Catégorie:
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="Actualités">Actualités</option>
            <option value="Événements">Événements</option>
            <option value="Conseils">Conseils</option>
          </select>
        </label>
        <label>
          Images:
          <input type="file" multiple onChange={handleFileChange} />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </label>
        <button onClick={handleSave}>Mettre à jour</button>
      </div>
    </div>
  );
};

export default EditPostPopin;
