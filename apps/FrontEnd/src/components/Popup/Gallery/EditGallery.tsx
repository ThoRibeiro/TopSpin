import React, { useState, useEffect, useRef } from "react";
import "./EditGallery.css";
import { EditGalleryPopinProps } from "../../../data/interfaces/Gallery";

const EditGallery: React.FC<EditGalleryPopinProps> = ({
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
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && gallery) {
      setTitle(gallery.title);
      setStartDate(new Date(gallery.startDate).toISOString().split("T")[0]);
      setEndDate(new Date(gallery.endDate).toISOString().split("T")[0]);
      setExistingImages(gallery.images);
      setImagePreviews(gallery.images);
    }
  }, [show, gallery]);

  const resetForm = () => {
    setTitle("");
    setStartDate("");
    setEndDate("");
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
      images.forEach((image) => formData.append("images", image));
      formData.append("existingImages", JSON.stringify(existingImages));
      formData.append("removedImages", JSON.stringify(removedImages));
      await onSave(gallery?._id, formData);
      onClose();
      resetForm();
    } catch (error) {
      console.error("Error updating gallery:", error);
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
    <div className="edit-gallery-modal">
      <div className="edit-gallery-modal-content" ref={modalRef}>
        <h2>Modifier la galerie</h2>
        <label className="edit-gallery-label">
          Titre:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="edit-gallery-input"
          />
        </label>
        <label className="edit-gallery-label">
          Date de début:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="edit-gallery-input"
          />
        </label>
        <label className="edit-gallery-label">
          Date de fin:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="edit-gallery-input"
          />
        </label>
        <label className="edit-gallery-label">
          Images:
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="edit-gallery-input"
          />
        </label>
        <div className="edit-gallery-image-previews">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="image-preview-container">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="edit-gallery-preview-image"
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
        <button onClick={handleSave} className="edit-gallery-button">
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default EditGallery;
