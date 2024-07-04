import React, { useState, useEffect, useRef } from "react";
import "./AddGallery.css";
import { AddGalleryPopinProps } from "../../../data/interfaces/Gallery";

const AddGallery: React.FC<AddGalleryPopinProps> = ({
  show,
  onClose,
  onSave,
  gallery,
}) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      if (gallery) {
        setTitle(gallery.title);
        setStartDate(gallery.startDate);
        setEndDate(gallery.endDate);
        setImagePreviews(gallery.images);
      } else {
        resetForm();
      }
    }
  }, [show, gallery]);

  const resetForm = () => {
    setTitle("");
    setStartDate("");
    setEndDate("");
    setImages([]);
    setImagePreviews([]);
  };

  const handleSave = async () => {
    try {
      console.log("handleSave called in AddGallery");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      images.forEach((image, index) => {
        console.log(`Appending image ${index + 1}:`, image);
        formData.append("images", image);
      });

      console.log("FormData before onSave:", formData);

      await onSave(formData);
      onClose();
      resetForm();
    } catch (error) {
      console.error("Error creating gallery:", error);
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
    <div className="add-gallery-modal">
      <div className="add-gallery-modal-content" ref={modalRef}>
        <h2>{gallery ? "Modifier la galerie" : "Ajouter une galerie"}</h2>
        <label className="add-gallery-label">
          Titre:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="add-gallery-input"
          />
        </label>
        <label className="add-gallery-label">
          Date de début:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="add-gallery-input"
          />
        </label>
        <label className="add-gallery-label">
          Date de fin:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="add-gallery-input"
          />
        </label>
        <label className="add-gallery-label">
          Images:
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="add-gallery-input"
          />
        </label>
        <div className="add-gallery-image-previews">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="image-preview-container">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="add-gallery-preview-image"
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
        <button onClick={handleSave} className="add-gallery-button">
          {gallery ? "Enregistrer" : "Ajouter"}
        </button>
      </div>
    </div>
  );
};

export default AddGallery;
