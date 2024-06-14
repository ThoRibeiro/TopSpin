import { Request, Response, NextFunction } from "express";
import Member, { IMembers } from "../models/memberModel";
import dotenv from "dotenv";

dotenv.config();

export const createMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (
    req.body.firstname === "" ||
    req.body.lastname === "" ||
    req.body.role === ""
  ) {
    return res.status(400).json({
      error:
        "Veuillez remplir tous les champs pour votre MEMBRE s'il vous plait !",
    });
  }

  const imagePath = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : "";

  const memberData: Partial<IMembers> = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    role: req.body.role,
    image: imagePath,
  };
  try {
    await Member.create(memberData);
    res.status(201).json({ message: "Membre enregistré avec succès !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updateMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const idMember = req.body.idMember;

  const imagePath = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : req.body.image;

  const memberData: Partial<IMembers> = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    role: req.body.role,
    image: imagePath,
  };
  try {
    const updatedMember = await Member.findByIdAndUpdate(idMember, memberData, {
      new: true,
    });
    if (!updatedMember) {
      return res.status(404).json({
        message:
          "Le membre que vous souhaitez modifier n'existe pas, merci de réessayer...",
      });
    }
    res.status(200).json({
      message: "Le MEMBRE a été mis à jour, merci !",
      member: updatedMember,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const idMember = req.body.idMember;
  try {
    const member = await Member.findByIdAndDelete(idMember);
    if (!member) {
      return res.status(404).json({
        message:
          "Le membre que vous souhaitez supprimer n'existe pas, merci de réessayer...",
      });
    }
    res.status(200).json({ message: "Membre supprimé avec succès !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getAllMembers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getMemberById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const idMember = req.params.idMember;
  try {
    const member = await Member.findById(idMember);
    if (!member) {
      return res.status(404).json({ message: "Membre introuvable..." });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ error });
  }
};
