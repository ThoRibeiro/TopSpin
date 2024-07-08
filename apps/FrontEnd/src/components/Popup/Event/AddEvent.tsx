import React, { useState, useEffect, useRef } from "react";
import "./AddEvent.css";
import { AddEventPopinProps } from "../../../data/interfaces/Event";

const AddEvent: React.FC<AddEventPopinProps> = ({ show, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      resetForm();
    }
  }, [show]);

  const resetForm = () => {
    setTitle("");
    setStartDate("");
    setEndDate("");
    setCategory("");
    setStatus("");
    setContent("");
    setImages([]);
    setImagePreviews([]);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("category", category);
      formData.append("status", status);
      formData.append("content", content);
      images.forEach((image) => formData.append("images", image));

      await onSave(formData);
      onClose();
      resetForm();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedImages);
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...files]);
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
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
    <div className="add-event-modal">
      <div className="add-event-modal-content" ref={modalRef}>
        <h2>Ajouter un événement</h2>
        <label className="add-event-label">
          Titre:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="add-event-input"
          />
        </label>
        <label className="add-event-label">
          Date de début:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="add-event-input"
          />
        </label>
        <label className="add-event-label">
          Date de fin:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="add-event-input"
          />
        </label>
        <label className="add-event-label">
          Catégorie:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="add-event-dropdown"
          >
            <option value="">Sélectionnez une catégorie</option>
            <option value="jeune">Jeune</option>
            <option value="adulte">Adulte</option>
            <option value="senior">Senior</option>
            <option value="toute catégorie">Toute catégorie</option>
          </select>
        </label>
        <label className="add-event-label">
          Statut:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="add-event-dropdown"
          >
            <option value="">Sélectionnez un statut</option>
            <option value="ouvert">Ouvert</option>
            <option value="fermé">Fermé</option>
          </select>
        </label>
        <label className="add-event-label">
          Contenu:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="add-event-textarea"
          />
        </label>
        <label className="add-event-label">
          Images:
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="add-event-input"
          />
        </label>
        <div className="add-event-image-previews">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="image-preview-container">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="add-event-preview-image"
              />
              <button
                className="remove-image-button"
                onClick={() => handleRemoveImage(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <button onClick={handleSave} className="add-event-button">
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default AddEvent;
