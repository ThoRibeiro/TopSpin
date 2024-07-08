import React from "react";

interface ImageWrapperProps {
  url: string;
  colSpan: string;
  rowSpan: string;
}

export const ImageWrapper: React.FC<ImageWrapperProps> = ({ url, colSpan, rowSpan }) => {
  return (
    <div
      className="image-wrapper"
      style={{
        gridColumn: colSpan,
        gridRow: rowSpan,
      }}
    >
      <img src={url} alt={url} />
    </div>
  );
};
