import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  createMember,
  updateMember,
  getAllMembers,
  getMemberById,
  deleteMember,
} from "../controllers/memberController";
import singleUpload from "../middlewares/multerMiddlwareSingleImage";

const memberRoutes = express.Router();

memberRoutes.post("/create", authMiddleware, singleUpload, createMember);
memberRoutes.put("/update", authMiddleware, singleUpload, updateMember);
memberRoutes.get("/all", getAllMembers);
memberRoutes.get("/:idMember", getMemberById);
memberRoutes.delete("/:idMember", authMiddleware, deleteMember);

export default memberRoutes;
