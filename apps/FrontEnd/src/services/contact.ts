import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

export const submitContactForm = async (formData: any) => {
  try {
    const response = await api.post("/contact", formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact form", error);
    throw error;
  }
};

export default api;
