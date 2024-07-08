import { Request, Response, NextFunction } from "express";
import Event, { IEvent, IParticipant } from "../models/eventModel";
import dotenv from "dotenv";
import mongoose from "mongoose";

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
        "Veuillez remplir tous les champs pour votre événement s'il vous plaît !",
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
    res.status(201).json({ message: "Événement enregistré avec succès !" });
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

  const eventData = {
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

export const updateEventStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const eventId = req.params.eventId;
  const { status } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ message: "L'événement spécifié n'existe pas." });
    }

    event.status = status;
    await event.save();

    res.status(200).json({
      message: "Statut de l'événement mis à jour avec succès.",
      event,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const events = await Event.find().select("-participants");
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

    const participant: IParticipant = {
      _id: new mongoose.Types.ObjectId(),
      email,
      firstName,
      lastName,
      age,
      status: "non-inscrit" as "non-inscrit",
    };

    event.participants.push(participant);

    await event.save();

    res.status(200).json({
      message: "Participant ajouté à l'événement avec succès !",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const eventId = req.params.eventId;

  try {
    const event = await Event.findByIdAndDelete(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ message: "L'événement spécifié n'existe pas." });
    }
    res.status(200).json({ message: "Événement supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getAllParticipantsByEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const eventId = req.params.eventId;
  try {
    const event = await Event.findById(eventId).select("participants");
    if (!event) {
      return res.status(404).json({ message: "Événement introuvable..." });
    }
    res.status(200).json(event.participants);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateParticipantStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const eventId = req.params.eventId;
  const participantId = req.params.participantId;
  const { status } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ message: "L'événement spécifié n'existe pas." });
    }

    const participant = event.participants.id(participantId);
    if (!participant) {
      return res
        .status(404)
        .json({ message: "Le participant spécifié n'existe pas." });
    }

    participant.status = status;
    await event.save();

    res.status(200).json({
      message: "Statut du participant mis à jour avec succès.",
      participant,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
