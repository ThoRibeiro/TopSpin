import React from "react";

interface ImageWrapperProps {
  url: string;
  colSpan: string;
  rowSpan: string;
  onClick: () => void;
}

export const ImageWrapper: React.FC<ImageWrapperProps> = ({
  url,
  colSpan,
  rowSpan,
  onClick,
}) => {
  return (
    <div
      className="image-wrapper"
      style={{
        gridColumn: colSpan,
        gridRow: rowSpan,
      }}
      onClick={onClick}
    >
      <img src={url} alt={url} />
    </div>
  );
};
