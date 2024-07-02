import { Request, Response, NextFunction } from "express";
import ContactModel from "../models/contactModel";

/**
 * Crée un nouveau contact.
 */
export const createContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, firstName, lastName, content } = req.body;

  if (!email || !firstName || !lastName || !content) {
    return res.status(400).json({
      error: "Veuillez remplir tous les champs du formulaire de contact.",
    });
  }

  const contactData = {
    email,
    firstName,
    lastName,
    content,
  };

  try {
    await ContactModel.create(contactData);
    res.status(201).json({ message: "Formulaire de contact enregistré avec succès !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * Récupère tous les contacts.
 */
export const getAllContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const contacts = await ContactModel.find().populate("referent");
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error });
  }
};

/**
 * Met à jour le statut d'un contact.
 */
export const updateContactStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedContact = await ContactModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact introuvable..." });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * Met à jour le référent d'un contact.
 */
export const updateContactReferent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { referent, status } = req.body;

  try {
    const updatedContact = await ContactModel.findByIdAndUpdate(
      id,
      { referent, status },
      { new: true }
    ).populate("referent");
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact introuvable..." });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ error });
  }
};
