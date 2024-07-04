import axios from "axios";
import { Gallery } from "../data/interfaces/Gallery";

const API_URL = "http://localhost:3500/gallery";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllGalleries = async () => {
  return await axios.get<Gallery[]>(API_URL, getAuthHeaders());
};

export const createGallery = async (formData: FormData) => {
  console.log("Sending createGallery request");
  const response = await axios.post(`${API_URL}/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...getAuthHeaders().headers,
    },
  });
  console.log("createGallery response:", response);
  return response;
};

export const updateGallery = async (id: string, formData: FormData) => {
  return await axios.put(`${API_URL}/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...getAuthHeaders().headers,
    },
  });
};

export const deleteGallery = async (id: string) => {
  return await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};

export default {
  getAllGalleries,
  createGallery,
  updateGallery,
  deleteGallery,
};
