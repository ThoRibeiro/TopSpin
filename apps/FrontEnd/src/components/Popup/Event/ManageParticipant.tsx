import React, { useState, useEffect, useRef } from "react";
import "./ManageParticipant.css";
import { Participant, ManageParticipantsPopinProps } from "../../../data/interfaces/Event";
import eventService from "../../../services/eventService";

const ManageParticipants: React.FC<ManageParticipantsPopinProps> = ({
                                                                      show,
                                                                      onClose,
                                                                      event,
                                                                      onParticipantStatusChange,
                                                                    }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUnvalidatedOnly, setShowUnvalidatedOnly] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await eventService.getParticipantsByEvent(event._id);
        setParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    if (show) {
      fetchParticipants();
    }
  }, [show, event._id]);

  const handleStatusChange = async (participantId: string, newStatus: "non-inscrit" | "inscrit") => {
    try {
      await onParticipantStatusChange(event._id, participantId, newStatus);
      setParticipants((prevParticipants) =>
        prevParticipants.map((participant) =>
          participant._id === participantId
            ? { ...participant, status: newStatus }
            : participant
        )
      );
    } catch (error) {
      console.error("Error updating participant status:", error);
    }
  };

  const filteredParticipants = participants.filter(participant => {
    const matchesSearchTerm =
      participant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesValidationFilter = showUnvalidatedOnly ? participant.status === "non-inscrit" : true;
    return matchesSearchTerm && matchesValidationFilter;
  });

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
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
    <div className="manage-participants-modal">
      <div className="manage-participants-modal-content" ref={modalRef}>
        <h2>Gérer les participants</h2>
        <div className="manage-participants-search-container">
          <input
            type="text"
            placeholder="Rechercher par nom ou prénom"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="manage-participants-search"
          />
          <label className="manage-participants-checkbox">
            <input
              type="checkbox"
              checked={showUnvalidatedOnly}
              onChange={(e) => setShowUnvalidatedOnly(e.target.checked)}
            />
            Afficher uniquement les participants non inscrits
          </label>
        </div>
        <ul className="manage-participants-list">
          {filteredParticipants.map(participant => (
            <li key={participant._id} className="manage-participants-item">
              <span>{participant.firstName} {participant.lastName}</span>
              <select
                value={participant.status}
                onChange={(e) => handleStatusChange(participant._id, e.target.value as "non-inscrit" | "inscrit")}
                className="manage-participants-dropdown"
              >
                <option value="non-inscrit">Non-inscrit</option>
                <option value="inscrit">Inscrit</option>
              </select>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageParticipants;
