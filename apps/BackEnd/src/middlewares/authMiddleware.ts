import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthenticatedRequest extends Request {
  token?: string | object;
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      console.error("Authorization header missing");
      return res
        .status(401)
        .json({ message: "Autentification incorrecte, merci de réessayer" });
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      console.error("Token missing");
      return res
        .status(401)
        .json({ message: "Autentification incorrecte, merci de réessayer" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not defined");
      return res
        .status(500)
        .json({ message: "Erreur de configuration du serveur" });
    }

    const decodedToken = jwt.verify(token, secret);
    req.token = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res
      .status(401)
      .json({ message: "Autentification incorrecte, merci de réessayer" });
  }
};

export default authMiddleware;
