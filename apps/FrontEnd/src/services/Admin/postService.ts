import axios from "axios";
import { Post } from "../../data/interfaces/Post";

const API_URL = "http://localhost:3500/post";

const getAuthHeaders = () => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createPost = async (postData: FormData) => {
  return await axios.post(`${API_URL}/create`, postData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...getAuthHeaders().headers,
    },
  });
};

export const updatePost = async (postId: string, postData: FormData) => {
  postData.append("idPost", postId);
  return await axios.put(`${API_URL}/update/${postId}`, postData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...getAuthHeaders().headers,
    },
  });
};

export const getAllPosts = async () => {
  return await axios.get<Post[]>(`${API_URL}/all`, getAuthHeaders());
};

export const getPostById = async (postId: string) => {
  return await axios.get<Post>(`${API_URL}/${postId}`, getAuthHeaders());
};

export const getPostsByCategory = async (category: string) => {
  return await axios.get<Post[]>(
    `${API_URL}/category/${category}`,
    getAuthHeaders(),
  );
};

export const getPostAndComments = async (postId: string) => {
  return await axios.get(`${API_URL}/${postId}/comments`, getAuthHeaders());
};

export const createComment = async (
  postId: string,
  message: string,
  userId: string,
) => {
  return await axios.post(
    `${API_URL}/${postId}/comments`,
    { message, userId },
    getAuthHeaders(),
  );
};

export const deletePost = async (postId: string) => {
  return await axios.delete(`${API_URL}/${postId}`, getAuthHeaders());
};

export default {
  createPost,
  updatePost,
  getAllPosts,
  getPostById,
  getPostsByCategory,
  getPostAndComments,
  createComment,
  deletePost,
};
