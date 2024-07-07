// src/services/newsService.ts
import axios from "axios";
import { Article } from "../data/interfaces/Article";

const API_URL = "http://localhost:3500/articles";

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des articles", error);
    throw error;
  }
};
