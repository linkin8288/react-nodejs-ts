// This component is mainly the interaction between UI form and function 
// that calls from outside api folder.

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createDeck } from "./api/createDeck";
import { deleteDeck } from "./api/deleteDeck";
import { getDecks, TDeck } from "./api/getDecks";
import "./App.css";

function App() {

  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  // This function is triggered when a form is submitted.
  // creates a new deck using the createDeck function, updates the decks state with the new deck, 
  // and resets the title state to an empty string. 
  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const deck = await createDeck(title);
    // This line updates the decks state by adding the newly created deck to the existing array of decks
    setDecks([...decks, deck]);
    // This line sets the title state to an empty string, presumably clearing the input field or resetting it after the deck has been created.
    setTitle("");
  }

  // This function is triggered when a close button is clicked 
  // calling the deleteDeck function and delete the Deck based on ID.
  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  // Deploy all Decks when the website mount
  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);

  return (
    <div className="container">
      <div className="App">
        <h1>Your Decks</h1>

        <ul className="decks">
          {decks.map((deck) => (
            <li key={deck._id}>
              {/* Delete button */}
              <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
              {/* Link to each card based on ID */}
              <Link to={`decks/${deck._id}`}>{deck.title}</Link>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCreateDeck}>
          <label htmlFor="deck-title">Deck Title</label>
          <input
            id="deck-title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
          <button>Create Deck</button>
        </form>
      </div>
    </div>
      
  )
}

export default App
