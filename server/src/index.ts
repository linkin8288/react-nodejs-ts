import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from './models/Deck';

const PORT = 5000;
const app = express();

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

app.get("/decks", (req: Request, res: Response) => {
  // initiate an object from Deck class
  res.send("Hello World")
});

mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.gtcqij2.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log(`app is listening on port ${PORT}`);
    app.listen(PORT);
  });
