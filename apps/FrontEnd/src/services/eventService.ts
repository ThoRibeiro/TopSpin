import axios from "axios";
import { Event, Participant } from "../data/interfaces/Event";

const API_URL = "http://localhost:3500/event";

const getAuthHeaders = () => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllEvents = async () => {
  return await axios.get<Event[]>(`${API_URL}/all`, getAuthHeaders());
};

export const createEvent = async (formData: FormData) => {
  return await axios.post(`${API_URL}/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...getAuthHeaders().headers,
    },
  });
};

export const updateEvent = async (id: string, formData: FormData) => {
  return await axios.put(`${API_URL}/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...getAuthHeaders().headers,
    },
  });
};

export const updateEventStatus = async (eventId: string, status: string) => {
  return await axios.put(
    `${API_URL}/update/${eventId}/status`,
    { status },
    getAuthHeaders(),
  );
};

export const deleteEvent = async (id: string) => {
  return await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};

export const getEventById = async (id: string) => {
  return await axios.get<Event>(`${API_URL}/${id}`, getAuthHeaders());
};

export const updateParticipantStatus = async (
  eventId: string,
  participantId: string,
  status: string,
) => {
  return await axios.put(
    `${API_URL}/${eventId}/participants/${participantId}/status`,
    { status },
    getAuthHeaders(),
  );
};

export const getParticipantsByEvent = async (eventId: string) => {
  return await axios.get<Participant[]>(
    `${API_URL}/${eventId}/participants`,
    getAuthHeaders(),
  );
};

export const addParticipantToEvent = async (eventId: string, participantData: { email: string, firstName: string, lastName: string, age: number }) => {
  console.log(participantData)
  return await axios.post(`${API_URL}/${eventId}/addParticipant`, participantData, getAuthHeaders());
};

export default {
  getAllEvents,
  createEvent,
  updateEvent,
  updateEventStatus,
  deleteEvent,
  getEventById,
  updateParticipantStatus,
  getParticipantsByEvent,
  addParticipantToEvent,
};
