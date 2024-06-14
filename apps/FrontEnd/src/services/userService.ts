import axios from "axios";

const API_URL = "http://localhost:3500/auth";

export const signin = async (
  email: string,
  password: string,
  username: string,
) => {
  return await axios.post(`${API_URL}/signin`, { email, password, username });
};

export const login = async (email: string, password: string) => {
  return await axios.post(`${API_URL}/login`, { email, password });
};
