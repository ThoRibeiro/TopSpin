import React from "react";
import './Gallery.css';

const imageSections = [
  {
    title: "Section 1",
    images: [
      "https://images.unsplash.com/photo-1506252374453-ef5237291d83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80",
      "https://images.unsplash.com/photo-1536273176101-b3810e5cb3c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1524546101258-e99b0826ea9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1936&q=80",
      "https://images.unsplash.com/photo-1486239154832-a989a601c41d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
      "https://images.unsplash.com/photo-1519458524098-335b2a5747b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
      "https://images.unsplash.com/photo-1548737787-a776beb45cfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      "https://images.unsplash.com/photo-1474218861938-d6b14818c8e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
      "https://images.unsplash.com/photo-1502842113467-03fdcac39fe5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
      "https://images.unsplash.com/photo-1548599042-0df640181771?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
  },
  {
    title: "Section 2",
    images: [
      "https://images.unsplash.com/photo-1515405969538-5642ed9d0cc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
      "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=926&q=80",
      "https://images.unsplash.com/photo-1460627390041-532a28402358?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      "https://images.unsplash.com/photo-1514673309919-5998bbbadf7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=688&q=80",
      "https://images.unsplash.com/photo-1543335785-8aadf6d8183c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80"
    ]
  }
];

const fixedSizes = [
  { colSpan: 'span 2', rowSpan: 'span 2' },
  { colSpan: 'span 2', rowSpan: 'span 3' },
  { colSpan: 'span 3', rowSpan: 'span 2' },
  { colSpan: 'span 3', rowSpan: 'span 3' },
  { colSpan: 'span 4', rowSpan: 'span 4' },
];

const getRandomSize = () => {
  return fixedSizes[Math.floor(Math.random() * fixedSizes.length)];
};

const Gallery: React.FC = () => {
  return (
    <>
      <div className="blur"></div>
      {imageSections.map((section, sectionIndex) => {
        return (
          <div key={sectionIndex} className="section">
            <h2 className="section-title">{section.title}</h2>
            <div className="container2">
              {section.images.map((url, index) => {
                const size = getRandomSize();
                return (
                  <div
                    key={index}
                    className="image-wrapper"
                    style={{
                      gridColumn: size.colSpan,
                      gridRow: size.rowSpan,
                    }}
                  >
                    <img src={url} alt={`image-${index}`} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Gallery;
