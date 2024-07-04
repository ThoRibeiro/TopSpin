import express from "express";
import {
  createGallery,
  getAllGalleries,
} from "../controllers/galleryController";
import authMiddleware from "../middlewares/authMiddleware";

const galleryRoutes = express.Router();

galleryRoutes.post("/create", authMiddleware, createGallery);
galleryRoutes.get("/", getAllGalleries);

export default galleryRoutes;
