import React, { useState, useEffect, useRef } from "react";
import "./AddPost.css";
import { Member } from "../../../data/interfaces/Member";
import memberService from "../../../services/memberService";

interface AddPostPopinProps {
  show: boolean;
  onClose: () => void;
  onSave: (post: FormData) => void;
}

const AddPost: React.FC<AddPostPopinProps> = ({ show, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    titlePost: "",
    content: "",
    categorie: "",
    image: null as File | null,
    memberId: "",
  });
  const [members, setMembers] = useState<Member[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await memberService.getAllMembers();
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    if (!show) {
      setFormData({
        titlePost: "",
        content: "",
        categorie: "",
        image: null,
        memberId: "",
      });
      setImagePreview(null);
    }
  }, [show]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData = new FormData();
    postData.append("titlePost", formData.titlePost);
    postData.append("content", formData.content);
    postData.append("categorie", formData.categorie);
    postData.append("memberId", formData.memberId);
    if (formData.image) {
      postData.append("image", formData.image);
    }
    onSave(postData);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <h2>Créer un nouveau post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titlePost">Titre</label>
            <input
              type="text"
              id="titlePost"
              name="titlePost"
              value={formData.titlePost}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Contenu</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="categorie">Catégorie</label>
            <select
              id="categorie"
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="Actualités">Actualités</option>
              <option value="Événements">Événements</option>
              <option value="Conseils">Conseils</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="memberId">Membre</label>
            <select
              id="memberId"
              name="memberId"
              value={formData.memberId}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner un membre</option>
              {members.map((member) => (
                <option key={member._id} value={member._id}>
                  {`${member.firstname} ${member.lastname}`}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
