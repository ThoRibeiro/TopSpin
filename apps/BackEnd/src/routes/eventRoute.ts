import express from 'express';
import {
  createEvent,
  updateEvent,
  getAllEvents,
  getEventById, addParticipantToEvent,
} from "../controllers/eventController";
import authMiddleware from '../middlewares/authMiddleware';
import upload from '../middlewares/multerMiddlware';

const eventRoutes = express.Router();

eventRoutes.post('/create', authMiddleware, upload, createEvent);
eventRoutes.put('/update/:eventId', authMiddleware, upload, updateEvent);
eventRoutes.get('/all', getAllEvents);
eventRoutes.get('/:eventId', getEventById);
eventRoutes.post('/addParticipate', addParticipantToEvent)

export default eventRoutes;
