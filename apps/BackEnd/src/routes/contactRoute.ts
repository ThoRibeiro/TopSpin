import express from "express";
import { createContact, getAllContact } from "../controllers/contactController";
import authMiddleware from "../middlewares/authMiddleware";

const contactRoutes = express.Router();

contactRoutes.post("/create", createContact);
contactRoutes.get("/", authMiddleware, getAllContact)

export default contactRoutes;
