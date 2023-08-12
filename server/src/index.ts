import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Deck from './models/Deck';
import { config } from 'dotenv';
config();

const PORT = 5000;
const app = express();
// cross origin
app.use(
  cors({
    origin: "*",
  })
);
// the middleware that parses incoming JSON data from HTTP requests.
app.use(express.json());

app.post("/decks", async (req: Request, res: Response) => {
  // initiate an object from Deck class
  const newDeck = new Deck({
    title: req.body.title
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

app.get("/decks", async (req: Request, res: Response) => {
  // fetch all decks adn send back to the user
  // 1. how do we fetch the decks from mongo?
  const decks = await Deck.find();
  console.log(decks);
  // 2. how do we send back the array to the ui?
});

app.delete("/decks/:deckId", async (req: Request, res: Response) => {
  // 1. get the dock id from the url
  const deckId = req.params.deckId;
  // 2. delete the deck from mongo
  const deck = Deck.findByIdAndDelete(deckId);
  // 3. return the deleted deck to the user who made the request
  res.json(deck);
});

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log(`app is listening on port ${PORT}`);
    app.listen(PORT);
  });
