import { Request, Response, NextFunction } from "express";
import ContactModel from "../models/contactModel";

export const createContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
    res
      .status(201)
      .json({ message: "Formulaire de contact enregistré avec succès !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
