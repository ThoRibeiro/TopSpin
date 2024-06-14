import axios from "axios";

const API_URL = "http://localhost:3500/event";

export const createEvent = async (eventData: FormData) => {
  return await axios.post(`${API_URL}/create`, eventData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateEvent = async (eventId: string, eventData: FormData) => {
  return await axios.put(`${API_URL}/update/${eventId}`, eventData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllEvents = async () => {
  return await axios.get(`${API_URL}/all`);
};

export const getEventById = async (eventId: string) => {
  return await axios.get(`${API_URL}/${eventId}`);
};

export const addParticipantToEvent = async (
  _eventId: string,
  participantData: {
    email: string;
    firstName: string;
    lastName: string;
    age: number;
  },
) => {
  return await axios.post(`${API_URL}/addParticipate`, participantData);
};
