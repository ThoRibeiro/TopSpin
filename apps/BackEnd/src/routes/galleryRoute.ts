import express from "express";
import {
  createGallery, deleteGallery,
  getAllGalleries,
  updateGallery,
} from "../controllers/galleryController";
import authMiddleware from "../middlewares/authMiddleware";

const galleryRoutes = express.Router();

galleryRoutes.post("/create", authMiddleware, createGallery);
galleryRoutes.put("/update/:id", authMiddleware, updateGallery);
galleryRoutes.delete("/:id", authMiddleware, deleteGallery);
galleryRoutes.get("/", getAllGalleries);

export default galleryRoutes;
