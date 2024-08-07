import React, { useState } from "react";
import { ImageWrapper } from "../ImageWrapper/ImageWrapper";
import { Modal } from "../Modal/Modal";

const fixedSizes = [
  { colSpan: "span 2", rowSpan: "span 2" },
  { colSpan: "span 2", rowSpan: "span 3" },
  { colSpan: "span 3", rowSpan: "span 2" },
  { colSpan: "span 3", rowSpan: "span 3" },
  { colSpan: "span 4", rowSpan: "span 4" },
];

const getRandomSize = () => {
  return fixedSizes[Math.floor(Math.random() * fixedSizes.length)];
};

interface SectionProps {
  title: string;
  images: string[];
}

export const Section: React.FC<SectionProps> = ({ title, images }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="section">
      <h2 className="section-title">{title}</h2>
      <div className="container2">
        {images.map((url, index) => {
          const size = getRandomSize();
          return (
            <ImageWrapper
              key={index}
              url={url}
              colSpan={size.colSpan}
              rowSpan={size.rowSpan}
              onClick={() => handleImageClick(index)}
            />
          );
        })}
      </div>
      {isModalOpen && (
        <Modal
          images={images}
          currentIndex={currentImageIndex}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
