import axios from 'axios';

const API_URL = 'http://localhost:3500/post';

export const createPost = async (postData: FormData) => {
  return await axios.post(`${API_URL}/create`, postData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const updatePost = async (_postId: string, postData: FormData) => {
  return await axios.put(`${API_URL}/update`, postData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getAllPosts = async () => {
  return await axios.get(`${API_URL}/all`);
};

export const getPostById = async (postId: string) => {
  return await axios.get(`${API_URL}/${postId}`);
};

export const getPostsByCategory = async (category: string) => {
  return await axios.get(`${API_URL}/category/${category}`);
};

export const getPostAndComments = async (postId: string) => {
  return await axios.get(`${API_URL}/${postId}/comments`);
};

export const createComment = async (postId: string, message: string, userId: string) => {
  return await axios.post(`${API_URL}/${postId}/comments`, { message, userId });
};
