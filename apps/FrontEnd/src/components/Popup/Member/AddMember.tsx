import React, { useState, useEffect, useRef } from "react";
import "./AddMember.css";
import { AddMemberPopinProps } from "../../../data/interfaces/Member.ts";

const roles = ["Président", "Trésorier", "Secrétaire", "Membre"];

const AddMember: React.FC<AddMemberPopinProps> = ({
  show,
  onClose,
  onSave,
  member,
}) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Président");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      if (member) {
        setFirstname(member.firstname);
        setLastname(member.lastname);
        setEmail(member.email);
        setRole(member.role);
        setImagePreview(member.image || null);
      } else {
        resetForm();
      }
    }
  }, [show, member]);

  const resetForm = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setRole("Président");
    setImage(null);
    setImagePreview(null);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("role", role);
    if (image) {
      formData.append("image", image);
    }
    onSave(formData);
    onClose();
    resetForm();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
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
      resetForm();
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
        <h2>{member ? "Modifier le membre" : "Ajouter un membre"}</h2>
        <label>
          Prénom:
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </label>
        <label>
          Nom:
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Rôle:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>
        <label>
          Image:
          <input type="file" onChange={handleFileChange} />
        </label>
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Prévisualisation" />
          </div>
        )}
        <button onClick={handleSave}>
          {member ? "Enregistrer" : "Ajouter"}
        </button>
      </div>
    </div>
  );
};

export default AddMember;
