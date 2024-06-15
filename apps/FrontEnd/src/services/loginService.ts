// src/services/apiService.ts
import axios from "axios";

const API_URL = "http://localhost:3500/auth";

interface LoginResponse {
  email: string;
  jwt: string;
}

const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export default {
  login,
};
