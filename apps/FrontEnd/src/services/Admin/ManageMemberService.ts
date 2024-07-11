import axios from "axios";

const API_URL = "http://localhost:3500/members";

const getAuthHeaders = () => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
};

export const getAllMembers = async () => {
  return await axios.get(`${API_URL}/all`);
};

export const updateMember = async (id: string, updatedInfo: FormData) => {
  return await axios.put(`${API_URL}/update`, updatedInfo, getAuthHeaders());
};

export const deleteMember = async (id: string) => {
  return await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};

export const createMember = async (newMember: FormData) => {
  return await axios.post(`${API_URL}/create`, newMember, getAuthHeaders());
};

export default {
  getAllMembers,
  updateMember,
  deleteMember,
  createMember,
};
