import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  createPost,
  updatePost,
  getAllPosts,
  getPostById,
  getPostsByCategorie,
  getPostAndComments,
  createComment, deletePost,
} from "../controllers/postController";
import upload from "../middlewares/multerMiddlware";

const postRoutes = express.Router();

postRoutes.post("/create", authMiddleware, upload, createPost);
postRoutes.put("/update", authMiddleware, upload, updatePost);
postRoutes.get("/all", getAllPosts);
postRoutes.get("/:idPost", authMiddleware, getPostById);
postRoutes.get("/category/:categorie", getPostsByCategorie);
postRoutes.get("/:idPost/comments", authMiddleware, getPostAndComments);
postRoutes.post("/:idPost/comments", authMiddleware, createComment);
postRoutes.delete("/:idPost", authMiddleware, deletePost);

export default postRoutes;
