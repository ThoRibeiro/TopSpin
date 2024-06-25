import axios from "axios";
import {
  Member,
  NewMemberInfo,
  UpdatedMemberInfo,
} from "../data/interfaces/Member";

const API_URL = "http://localhost:3500/members";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllMembers = async () => {
  return await axios.get<Member[]>(`${API_URL}/all`);
};

export const updateMember = async (
  id: string,
  updatedInfo: UpdatedMemberInfo,
) => {
  return await axios.put<Member>(
    `${API_URL}/update`,
    { idMember: id, ...updatedInfo },
    getAuthHeaders(),
  );
};

export const deleteMember = async (id: string) => {
  return await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};

export const createMember = async (newMember: NewMemberInfo) => {
  return await axios.post<Member>(
    `${API_URL}/create`,
    newMember,
    getAuthHeaders(),
  );
};
export default {
  getAllMembers,
  updateMember,
  deleteMember,
  createMember,
};
