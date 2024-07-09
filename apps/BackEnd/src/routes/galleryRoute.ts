import express from "express";
import {
  createGallery,
  deleteGallery,
  getAllGalleries,
  updateGallery,
  getTenImagesByTitle,
  getAllImagesByTitle,
} from "../controllers/galleryController";
import authMiddleware from "../middlewares/authMiddleware";

const galleryRoutes = express.Router();

galleryRoutes.post("/create", authMiddleware, createGallery);
galleryRoutes.put("/update/:id", authMiddleware, updateGallery);
galleryRoutes.delete("/:id", authMiddleware, deleteGallery);
galleryRoutes.get("/", getAllGalleries);
galleryRoutes.get("/galleries/:title/ten", getTenImagesByTitle); // Route to get 10 images by title
galleryRoutes.get("/galleries/:title/all", getAllImagesByTitle); // Route to get all images by title

export default galleryRoutes;
