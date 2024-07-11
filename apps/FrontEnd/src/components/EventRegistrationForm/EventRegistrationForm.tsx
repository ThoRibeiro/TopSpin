import React, { useState } from "react";
import "./EventRegistrationForm.css";

interface EventRegistrationFormProps {
  onClose: () => void;
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ajoutez la logique pour envoyer les données du formulaire à votre serveur
    console.log(formData);
    onClose(); // Fermez le formulaire après soumission
  };

  return (
    <div className="registration-form-overlay">
      <div className="registration-form-container">
        <h2>Inscription à l'événement</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit">S'inscrire</button>
            <button type="button" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventRegistrationForm;
