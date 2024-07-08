import express from "express";
import {
  createEvent,
  updateEvent,
  getAllEvents,
  getEventById,
  addParticipantToEvent,
  deleteEvent,
  getAllParticipantsByEvent,
  updateParticipantStatus,
  updateEventStatus,
} from "../controllers/eventController";
import authMiddleware from "../middlewares/authMiddleware";
import upload from "../middlewares/multerMiddlware";

const eventRoutes = express.Router();

eventRoutes.post("/create", authMiddleware, upload, createEvent);
eventRoutes.put("/update/:eventId", authMiddleware, upload, updateEvent);
eventRoutes.put("/update/:eventId/status", authMiddleware, updateEventStatus);
eventRoutes.get("/all", getAllEvents);
eventRoutes.get("/:eventId", getEventById);
eventRoutes.delete("/:eventId", authMiddleware, deleteEvent);
eventRoutes.post("/:eventId/addParticipant", addParticipantToEvent);
eventRoutes.get("/:eventId/participants", getAllParticipantsByEvent);
eventRoutes.put(
  "/:eventId/participants/:participantId/status",
  updateParticipantStatus,
);

export default eventRoutes;
