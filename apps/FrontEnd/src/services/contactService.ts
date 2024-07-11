import axios from "axios";

const API_URL = "http://localhost:3500/contact";

const getAuthHeaders = () => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

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
  return await axios.get(`${API_URL}/`, getAuthHeaders());
};

export const updateContactStatus = async (id: string, status: string) => {
  return await axios.put(
    `${API_URL}/${id}/status`,
    { status },
    getAuthHeaders(),
  );
};

export const updateContactReferent = async (id: string, referent: string) => {
  return await axios.put(
    `${API_URL}/${id}/referent`,
    { referent },
    getAuthHeaders(),
  );
};

export const getAllMembers = async () => {
  return await axios.get("http://localhost:3500/members/", getAuthHeaders());
};

export default {
  createContact,
  getAllContacts,
  updateContactStatus,
  updateContactReferent,
  getAllMembers,
};
