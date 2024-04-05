import express from "express";
import bodyParser from "body-parser";


const PORT = 3500;

/**
 * Initialise le serveur Express avec les routes nécessaires.
 */
async function main() {
  const server = express();
  server.use(bodyParser.json());

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

}
main();
