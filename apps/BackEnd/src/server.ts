import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoute";
import postRoute from "./routes/postRoute";
import postRoutes from "./routes/postRoute";

const PORT = 3500;

/**
 * Initialise le serveur Express avec les routes nécessaires.
 */
async function main() {
  const server = express();
  server.use(bodyParser.json());

  // Utilisez vos routes d'authentification
  server.use('/auth', authRoutes);
  server.use('/post', postRoutes)

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  try {
    await mongoose.connect('mongodb://localhost:27017/topSpin', {});
    console.log('Connected to database');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

main();
