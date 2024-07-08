import React, { useState, useEffect } from "react";
import eventService from "../../../services/eventService";
import "./ManageEvent.css";
import AddEventPopin from "../../../components/Popup/Event/AddEvent";
import EditEventPopin from "../../../components/Popup/Event/EditEvent";
import ManageParticipants from "../../../components/Popup/Event/ManageParticipant";
import {
  notifySuccess,
  notifyError,
} from "../../../components/Toast/ToastNotification";
import { Event } from "../../../data/interfaces/Event";
import { useAuth } from "../../../Context/AuthContext";

const ManageEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showAddPopin, setShowAddPopin] = useState(false);
  const [showEditPopin, setShowEditPopin] = useState(false);
  const [showParticipantsPopin, setShowParticipantsPopin] = useState(false);
  const { setIsAdminPage } = useAuth();

  useEffect(() => {
    setIsAdminPage(true);
    return () => {
      setIsAdminPage(false);
    };
  }, [setIsAdminPage]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getAllEvents();
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        notifyError("Erreur lors de la récupération des événements.");
      }
    };
    fetchEvents();
  }, []);

  const handleSave = async (formData: FormData) => {
    try {
      await eventService.createEvent(formData);
      notifySuccess("Événement créé avec succès.");
      const response = await eventService.getAllEvents();
      setEvents(response.data);
      setShowAddPopin(false);
    } catch (error) {
      console.error("Error creating event:", error);
      notifyError("Erreur lors de la création de l'événement.");
    }
  };

  const handleUpdate = async (id: string, formData: FormData) => {
    try {
      await eventService.updateEvent(id, formData);
      notifySuccess("Événement mis à jour avec succès.");
      const response = await eventService.getAllEvents();
      setEvents(response.data);
      setShowEditPopin(false);
    } catch (error) {
      console.error("Error updating event:", error);
      notifyError("Erreur lors de la mise à jour de l'événement.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await eventService.deleteEvent(id);
      notifySuccess("Événement supprimé avec succès.");
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
      notifyError("Erreur lors de la suppression de l'événement.");
    }
  };

  const handleStatusChange = async (eventId: string, newStatus: string) => {
    try {
      await eventService.updateEventStatus(eventId, newStatus);
      notifySuccess("Statut de l'événement mis à jour avec succès.");
      const response = await eventService.getAllEvents();
      setEvents(response.data);
    } catch (error) {
      console.error("Error updating event status:", error);
      notifyError("Erreur lors de la mise à jour du statut de l'événement.");
    }
  };

  const handleParticipantStatusChange = async (eventId: string, participantId: string, status: string) => {
    try {
      await eventService.updateParticipantStatus(eventId, participantId, status);
      notifySuccess("Statut du participant mis à jour avec succès.");
      const response = await eventService.getEventById(eventId);
      setEditingEvent(response.data);
    } catch (error) {
      console.error("Error updating participant status:", error);
      notifyError("Erreur lors de la mise à jour du statut du participant.");
    }
  };

  return (
    <div className="manage-events">
      <h1 className="manage-events-title">Gérer les Événements</h1>
      <button
        onClick={() => setShowAddPopin(true)}
        className="manage-events-add-button"
      >
        Créer un Événement
      </button>
      <table className="manage-events-table">
        <thead className="manage-events-thead">
        <tr className="manage-events-thead-tr">
          <th className="manage-events-th">Titre</th>
          <th className="manage-events-th">Date de début</th>
          <th className="manage-events-th">Date de fin</th>
          <th className="manage-events-th">Statut</th>
          <th className="manage-events-th">Actions</th>
        </tr>
        </thead>
        <tbody className="manage-events-tbody">
        {events.map((event) => (
          <tr key={event._id} className="manage-events-tbody-tr">
            <td className="manage-events-td">{event.title}</td>
            <td className="manage-events-td">
              {new Date(event.startDate).toLocaleDateString()}
            </td>
            <td className="manage-events-td">
              {new Date(event.endDate).toLocaleDateString()}
            </td>
            <td className="manage-events-td">
              <select
                value={event.status}
                onChange={(e) => handleStatusChange(event._id, e.target.value)}
                className="manage-events-dropdown"
              >
                <option value="ouvert">Ouvert</option>
                <option value="fermé">Fermé</option>
              </select>
            </td>
            <td className="manage-events-td">
              <button
                onClick={() => {
                  setEditingEvent(event);
                  setShowEditPopin(true);
                }}
                className="manage-events-edit-button"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                className="manage-events-delete-button"
              >
                Supprimer
              </button>
              <button
                onClick={() => {
                  setEditingEvent(event);
                  setShowParticipantsPopin(true);
                }}
                className="manage-events-participants-button"
              >
                Participants
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <AddEventPopin
        show={showAddPopin}
        onClose={() => setShowAddPopin(false)}
        onSave={handleSave}
      />
      {editingEvent && (
        <>
          <EditEventPopin
            show={showEditPopin}
            onClose={() => setShowEditPopin(false)}
            onSave={handleUpdate}
            event={editingEvent}
          />
          <ManageParticipants
            show={showParticipantsPopin}
            onClose={() => setShowParticipantsPopin(false)}
            event={editingEvent}
            onParticipantStatusChange={handleParticipantStatusChange}
          />
        </>
      )}
    </div>
  );
};

export default ManageEvents;
