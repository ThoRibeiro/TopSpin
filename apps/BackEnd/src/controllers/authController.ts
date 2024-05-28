import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { Request, Response, NextFunction } from "express";

import User from "../models/userModel";

dotenv.config();

class AuthController {
  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const emailExist = await User.findOne({ email: req.body.email });
      if (emailExist) {
        res.status(484).json({
          message:
            "Vous avez déjà un compte avec cet e-mail, merci de prendre un autre email ou de vous connecter :)",
        });
      } else {
        const hash = await bcrypt.hash(req.body.password, 10);
        try {
          const user = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: hash,
          });
          res.status(201).json({ message: "Utilisateur créé !" });
        } catch (error) {
          res.status(500).json({ message: error });
        }
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.email || !req.body.password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const success = await bcrypt.compare(
        req.body.password,
        user.password.toString(),
      );
      if (!success) {
        return res.status(401).json({ message: "Password not correct" });
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        console.error("JWT_SECRET is not defined");
        return res.status(500).json({ message: "Server configuration error" });
      }

      const token = jwt.sign({ email: user.email, id: user._id }, secret);

      return res.status(200).json({ email: user.email, jwt: token });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default AuthController;
