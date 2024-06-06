import { Request, Response, NextFunction } from "express";
import Event, { IEvent } from "../models/eventModel";
import dotenv from "dotenv";

dotenv.config();

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (
    !req.body.title ||
    !req.body.startDate ||
    !req.body.endDate ||
    !req.body.category ||
    !req.body.status ||
    !req.body.content
  ) {
    return res.status(400).json({
      error:
        "Veuillez remplir tous les champs pour votre événement s'il vous plait !",
    });
  }

  let imagePaths: string[] = [];
  if (req.files) {
    const files = req.files as Express.Multer.File[];
    imagePaths = files.map(
      (file) => `${req.protocol}://${req.get("host")}/images/${file.filename}`,
    );
  }

  const eventData: Partial<IEvent> = {
    title: req.body.title,
    startDate: new Date(req.body.startDate),
    endDate: new Date(req.body.endDate),
    category: req.body.category,
    status: req.body.status,
    images: imagePaths,
    content: req.body.content,
  };

  try {
    const event = await Event.create(eventData);
    res
      .status(201)
      .json({ message: "Événement enregistré avec succès !", event });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const eventId = req.params.eventId;

  if (
    !req.body.title ||
    !req.body.startDate ||
    !req.body.endDate ||
    !req.body.category ||
    !req.body.status ||
    !req.body.content
  ) {
    return res.status(400).json({
      error:
        "Veuillez remplir tous les champs pour mettre à jour l'événement !",
    });
  }

  let imagePaths: string[] = [];
  if (req.files) {
    const files = req.files as Express.Multer.File[];
    imagePaths = files.map(
      (file) => `${req.protocol}://${req.get("host")}/images/${file.filename}`,
    );
  }

  const eventData: Partial<IEvent> = {
    title: req.body.title,
    startDate: new Date(req.body.startDate),
    endDate: new Date(req.body.endDate),
    category: req.body.category,
    status: req.body.status,
    images: imagePaths,
    content: req.body.content,
  };

  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, eventData, {
      new: true,
    });
    if (!updatedEvent) {
      return res.status(404).json({
        message: "L'événement que vous souhaitez mettre à jour n'existe pas.",
      });
    }
    res.status(200).json({
      message: "L'événement a été mis à jour avec succès !",
      event: updatedEvent,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getEventById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const eventId = req.params.eventId;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Événement introuvable..." });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const addParticipantToEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const eventId = req.params.eventId;
  const { email, firstName, lastName, age } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ message: "L'événement spécifié n'existe pas." });
    }

    // Création du participant
    const participant = { email, firstName, lastName, age };

    event.participate.push(participant);

    const updatedEvent = await event.save();

    res.status(200).json({
      message: "Participant ajouté à l'événement avec succès !",
      event: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
