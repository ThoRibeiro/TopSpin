import React, { useEffect } from "react";
import "./Modal.css";

interface ModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  images,
  currentIndex,
  onClose,
}) => {
  const [currentImageIndex, setCurrentImageIndex] =
    React.useState<number>(currentIndex);

  const handleNext = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length,
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrev();
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentImageIndex]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <button className="modal-prev" onClick={handlePrev}>
          ←
        </button>
        <img
          src={images[currentImageIndex]}
          alt={`image-${currentImageIndex}`}
        />
        <button className="modal-next" onClick={handleNext}>
          →
        </button>
      </div>
    </div>
  );
};
