import axios from "axios";

const API_URL = "http://localhost:3500/contact";

export const createContact = async (
  email: string,
  firstName: string,
  lastName: string,
  content: string,
) => {
  return await axios.post(`${API_URL}/create`, {
    email,
    firstName,
    lastName,
    content,
  });
};

export const getAllContacts = async () => {
  return await axios.get(`${API_URL}/`);
};
