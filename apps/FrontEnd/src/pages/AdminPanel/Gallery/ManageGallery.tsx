import React, { useState, useEffect } from "react";
import galleryService from "../../../services/galleryService";
import "./ManageGallery.css";
import AddGalleryPopin from "../../../components/Popup/Gallery/AddGallery";
import EditGalleryPopin from "../../../components/Popup/Gallery/EditGallery";
import {
  notifySuccess,
  notifyError,
} from "../../../components/Toast/ToastNotification";
import { Gallery } from "../../../data/interfaces/Gallery";
import { useAuth } from "../../../Context/AuthContext";

const ManageGallery: React.FC = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
  const [showAddPopin, setShowAddPopin] = useState(false);
  const [showEditPopin, setShowEditPopin] = useState(false);
  const { setIsAdminPage } = useAuth();

  useEffect(() => {
    setIsAdminPage(true);
    return () => {
      setIsAdminPage(false);
    };
  }, [setIsAdminPage]);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await galleryService.getAllGalleries();
        setGalleries(response.data);
      } catch (error) {
        console.error("Error fetching galleries:", error);
        notifyError("Erreur lors de la récupération des galeries.");
      }
    };
    fetchGalleries();
  }, []);

  const handleSave = async (formData: FormData) => {
    try {
      await galleryService.createGallery(formData);
      notifySuccess("Galerie créée avec succès.");
      const response = await galleryService.getAllGalleries();
      setGalleries(response.data);
      setShowAddPopin(false);
    } catch (error) {
      console.error("Error creating gallery:", error);
      notifyError("Erreur lors de la création de la galerie.");
    }
  };

  const handleUpdate = async (id: string, formData: FormData) => {
    try {
      await galleryService.updateGallery(id, formData);
      notifySuccess("Galerie mise à jour avec succès.");
      const response = await galleryService.getAllGalleries();
      setGalleries(response.data);
      setShowEditPopin(false);
    } catch (error) {
      console.error("Error updating gallery:", error);
      notifyError("Erreur lors de la mise à jour de la galerie.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await galleryService.deleteGallery(id);
      notifySuccess("Galerie supprimée avec succès.");
      setGalleries(galleries.filter((gallery) => gallery._id !== id));
    } catch (error) {
      console.error("Error deleting gallery:", error);
      notifyError("Erreur lors de la suppression de la galerie.");
    }
  };

  return (
    <div className="manage-gallery">
      <h1 className="manage-gallery-title">Gérer les Galeries</h1>
      <button onClick={() => setShowAddPopin(true)} className="manage-gallery-add-button">
        Créer une Galerie
      </button>
      <table className="manage-gallery-table">
        <thead className="manage-gallery-thead">
        <tr className="manage-gallery-thead-tr">
          <th className="manage-gallery-th">Titre</th>
          <th className="manage-gallery-th">Date de début</th>
          <th className="manage-gallery-th">Date de fin</th>
          <th className="manage-gallery-th">Images</th>
          <th className="manage-gallery-th">Actions</th>
        </tr>
        </thead>
        <tbody className="manage-gallery-tbody">
        {galleries.map((gallery) => (
          <tr key={gallery._id} className="manage-gallery-tbody-tr">
            <td className="manage-gallery-td">{gallery.title}</td>
            <td className="manage-gallery-td">{new Date(gallery.startDate).toLocaleDateString()}</td>
            <td className="manage-gallery-td">{new Date(gallery.endDate).toLocaleDateString()}</td>
            <td className="manage-gallery-td">
              {gallery.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  className="manage-gallery-image"
                />
              ))}
            </td>
            <td className="manage-gallery-td">
              <button
                onClick={() => {
                  setEditingGallery(gallery);
                  setShowEditPopin(true);
                }}
                className="manage-gallery-edit-button"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(gallery._id)}
                className="manage-gallery-delete-button"
              >
                Supprimer
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <AddGalleryPopin
        show={showAddPopin}
        onClose={() => setShowAddPopin(false)}
        onSave={handleSave}
      />
      {editingGallery && (
        <EditGalleryPopin
          show={showEditPopin}
          onClose={() => setShowEditPopin(false)}
          onSave={handleUpdate}
          gallery={editingGallery}
        />
      )}
    </div>
  );
};

export default ManageGallery;
