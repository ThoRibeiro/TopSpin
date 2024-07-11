import React, { useState, useEffect, useRef } from "react";
import "./EventRegistrationForm.css";
import eventService from "../../services/eventService";

interface EventRegistrationFormProps {
  eventId: string;
  onClose: () => void;
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({
  eventId,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  });

  const formRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(eventId);
    e.preventDefault();
    try {
      await eventService.addParticipantToEvent(eventId, {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: parseInt(formData.age),
      });
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'inscription à l'événement", error);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="registration-form-overlay">
      <div className="registration-form-container" ref={formRef}>
        <h2>Inscription à l'événement</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              id="firstname"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Nom</label>
            <input
              type="text"
              id="lastname"
              name="lastName"
              value={formData.lastName}
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
            <label htmlFor="age">Âge</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit">S'inscrire</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventRegistrationForm;
