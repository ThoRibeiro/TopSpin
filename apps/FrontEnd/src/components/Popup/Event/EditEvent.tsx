import React, { useState, useEffect, useRef } from "react";
import "./EditEvent.css";
import { EditEventPopinProps } from "../../../data/interfaces/Event";

const EditEvent: React.FC<EditEventPopinProps> = ({
                                                    show,
                                                    onClose,
                                                    onSave,
                                                    event,
                                                  }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && event) {
      setTitle(event.title);
      setStartDate(new Date(event.startDate).toISOString().split("T")[0]);
      setEndDate(new Date(event.endDate).toISOString().split("T")[0]);
      setCategory(event.category);
      setStatus(event.status);
      setContent(event.content);
      setExistingImages(event.images);
      setImagePreviews(event.images);
    }
  }, [show, event]);

  const resetForm = () => {
    setTitle("");
    setStartDate("");
    setEndDate("");
    setCategory("");
    setStatus("");
    setContent("");
    setImages([]);
    setImagePreviews([]);
    setExistingImages([]);
    setRemovedImages([]);
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
      formData.append("existingImages", JSON.stringify(existingImages));
      formData.append("removedImages", JSON.stringify(removedImages));
      await onSave(event?._id, formData);
      onClose();
      resetForm();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleRemoveImage = (index: number, isExisting: boolean) => {
    if (isExisting) {
      const removedImage = existingImages[index];
      setRemovedImages([...removedImages, removedImage]);
      setExistingImages(existingImages.filter((_, i) => i !== index));
    }
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
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
    <div className="edit-event-modal">
      <div className="edit-event-modal-content" ref={modalRef}>
        <h2>Modifier l'événement</h2>
        <label className="edit-event-label">
          Titre:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="edit-event-input"
          />
        </label>
        <div className="edit-event-date-container">
          <label className="edit-event-label">
            Date de début:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="edit-event-input"
            />
          </label>
          <label className="edit-event-label">
            Date de fin:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="edit-event-input"
            />
          </label>
        </div>
        <label className="edit-event-label">
          Catégorie:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="edit-event-input"
          >
            <option value="jeune">Jeune</option>
            <option value="adulte">Adulte</option>
            <option value="senior">Senior</option>
            <option value="toute catégorie">Toute catégorie</option>
          </select>
        </label>
        <label className="edit-event-label">
          Statut:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="edit-event-input"
          >
            <option value="ouvert">Ouvert</option>
            <option value="fermé">Fermé</option>
          </select>
        </label>
        <label className="edit-event-label">
          Contenu:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="edit-event-input"
          />
        </label>
        <label className="edit-event-label">
          Images:
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="edit-event-input"
          />
        </label>
        <div className="edit-event-image-previews">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="image-preview-container">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="edit-event-preview-image"
              />
              <button
                className="remove-image-button"
                onClick={() =>
                  handleRemoveImage(index, index < existingImages.length)
                }
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <button onClick={handleSave} className="edit-event-button">
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default EditEvent;
