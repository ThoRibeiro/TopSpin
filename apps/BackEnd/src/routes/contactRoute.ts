import express from 'express';
import { createContact } from '../controllers/contactController';

const contactRoutes = express.Router();

contactRoutes.post('/create', createContact);

export default contactRoutes;
