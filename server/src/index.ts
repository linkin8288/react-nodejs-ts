import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from 'dotenv';
config();

// Separate HTTP request logic to different folder
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";


const PORT = 5000;
const app = express();
// cross origin
app.use(
  cors({
    origin: "*",
  })
);

// the middleware that parses incoming JSON data from HTTP requests.
// which was replaced by controllers
app.use(express.json());

app.post("/decks", createDeckController);

app.get("/decks", getDecksController);

app.delete("/decks/:deckId", deleteDeckController);

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log(`app is listening on port ${PORT}`);
    app.listen(PORT);
  });
