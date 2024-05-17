import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { Request, Response, NextFunction } from 'express';

import User from "../models/userModel";

dotenv.config()

class AuthController{

  async signin (req: Request, res: Response, next: NextFunction) {
    try {
      const emailExist = await User.findOne({ email: req.body.email });
      if (emailExist) {
        res.status(484).json({ message: "Vous avez déjà un compte avec cet e-mail, merci de prendre un autre email ou de vous connecter :)" });
      } else {
        const hash = await bcrypt.hash(req.body.password, 10);
        try {
          const user = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: hash
          });
          res.status(201).json({ message: "Utilisateur créé !" });
        } catch (error) {
          res.status(500).json({ message: error });
        }
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  async login (req: Request, res: Response, next: NextFunction){
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const success = await bcrypt.compare(req.body.password, user.password.toString());
        if (success) {
          const token = jwt.sign(
            {
              email: user.email,
              id: user._id
            },
            process.env.JWT_TOKEN as string
          );

          res.status(200).json({
            email: user.email,
            jwt: token
          });
        } else {
          res.status(401).json({ message: "Password not correct" });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
}

export default AuthController;
