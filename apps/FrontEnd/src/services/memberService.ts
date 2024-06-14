import axios from "axios";

const API_URL = "http://localhost:3500/members";

export const createMember = async (
  firstname: string,
  lastname: string,
  role: string,
) => {
  return await axios.post(`${API_URL}/create`, { firstname, lastname, role });
};

export const updateMember = async (
  _memberId: string,
  memberData: { firstname: string; lastname: string; role: string },
) => {
  return await axios.put(`${API_URL}/update`, memberData);
};

export const deleteMember = async (memberId: string) => {
  return await axios.delete(`${API_URL}/${memberId}`);
};

export const getAllMembers = async () => {
  return await axios.get(`${API_URL}/all`);
};

export const getMemberById = async (memberId: string) => {
  return await axios.get(`${API_URL}/${memberId}`);
};
