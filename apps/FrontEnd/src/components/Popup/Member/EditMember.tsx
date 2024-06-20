import React, { useState, useEffect, useRef } from "react";
import "./AddMember.css";

interface EditMemberPopinProps {
  show: boolean;
  onClose: () => void;
  onSave: (memberData: {
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    image?: string;
  }) => void;
  member: {
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    image?: string;
  };
}

const roles = ["Président", "Trésorier", "Secrétaire", "Membre"];

const EditMemberPopin: React.FC<EditMemberPopinProps> = ({
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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (member) {
      setFirstname(member.firstname);
      setLastname(member.lastname);
      setEmail(member.email);
      setRole(member.role);
    }
  }, [member]);

  const handleSave = () => {
    const memberData = {
      firstname,
      lastname,
      email,
      role,
      image: image ? URL.createObjectURL(image) : member.image,
    };
    onSave(memberData);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
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
        <h2>Modifier le membre</h2>
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
        <button onClick={handleSave}>Enregistrer</button>
      </div>
    </div>
  );
};

export default EditMemberPopin;
