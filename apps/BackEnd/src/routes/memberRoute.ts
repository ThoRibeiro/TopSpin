import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  createMember,
  updateMember,
  getAllMembers,
  getMemberById,
  deleteMember,
} from "../controllers/memberController";
import upload from "../middlewares/multerMiddlware";

const memberRoutes = express.Router();

memberRoutes.post("/create", authMiddleware, upload, createMember);
memberRoutes.put("/update", authMiddleware, upload, updateMember);
memberRoutes.get("/all", getAllMembers);
memberRoutes.get("/:idMember", getMemberById);
memberRoutes.delete("/:idMember", authMiddleware, deleteMember);

export default memberRoutes;
