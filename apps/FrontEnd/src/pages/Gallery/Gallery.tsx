import React, { useEffect, useState } from "react";
import { Section } from "../../components/Section/Section";
import "./Gallery.css";

interface Gallery {
  _id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  images: string[];
}

const Gallery: React.FC = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch("/api/galleries");
        const data = await response.json();
        setGalleries(data);
        setLoading(false);
      } catch (error) {
        setError("Erreur lors de la récupération des galeries.");
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="blur"></div>
      {galleries.map((gallery, sectionIndex) => (
        <Section
          key={gallery._id}
          title={gallery.title}
          images={gallery.images.slice(0, 10)}
        />
      ))}
    </>
  );
};

export default Gallery;
