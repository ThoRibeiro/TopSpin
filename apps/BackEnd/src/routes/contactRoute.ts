import express from "express";
import {
  createContact,
  getAllContact,
  updateContactStatus,
  updateContactReferent
} from "../controllers/contactController";
import authMiddleware from "../middlewares/authMiddleware";

const contactRoutes = express.Router();

contactRoutes.post("/create", createContact);
contactRoutes.get("/", authMiddleware, getAllContact);
contactRoutes.put("/:id/status", authMiddleware, updateContactStatus);
contactRoutes.put("/:id/referent", authMiddleware, updateContactReferent);

export default contactRoutes;
