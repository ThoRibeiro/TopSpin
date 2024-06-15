import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import Member from "../models/memberModel";

dotenv.config();

class AuthController {
  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const emailExist = await User.findOne({ email: req.body.email });
      if (emailExist) {
        return res.status(484).json({
          message:
            "Vous avez déjà un compte avec cet e-mail, merci de prendre un autre email ou de vous connecter :)",
        });
      }

      const memberExist = await Member.findById(req.body.memberId);
      if (!memberExist) {
        return res.status(404).json({
          message: "Le membre spécifié n'existe pas",
        });
      }

      const hash = await bcrypt.hash(req.body.password, 10);

      const user = await User.create({
        email: req.body.email,
        username: req.body.username,
        password: hash,
        member: req.body.memberId,
        role: req.body.role,
      });

      return res.status(201).json({ message: "Utilisateur créé !" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.email || !req.body.password) {
        return res
          .status(400)
          .json({ message: "Email et mot de passe sont requis" });
      }

      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      const success = await bcrypt.compare(
        req.body.password,
        user.password.toString(),
      );
      if (!success) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }

      const allowedRoles = ["Président", "Trésorier", "Secrétaire"];
      if (!allowedRoles.includes(user.role)) {
        return res
          .status(403)
          .json({
            message: "Accès refusé: vous n'avez pas les droits nécessaires.",
          });
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        console.error("JWT_SECRET is not defined");
        return res
          .status(500)
          .json({ message: "Erreur de configuration du serveur" });
      }

      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        secret,
      );

      return res.status(200).json({ email: user.email, jwt: token });
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      return res.status(500).json({ message: "Erreur interne du serveur" });
    }
  }
}

export default AuthController;
