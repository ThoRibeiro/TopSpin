import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthenticatedRequest extends Request {
  token?: string | object;
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ message: "Autentification incorrecte, merci de réessayer" });
    }

    const token = authorizationHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN as string);
    req.token = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Autentification incorrecte, merci de réessayer" });
  }
};

export default authMiddleware;
