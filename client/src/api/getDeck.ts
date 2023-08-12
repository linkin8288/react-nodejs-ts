import { API_URL } from "./config";
import { TDeck } from "./getDecks";

// This code leads to single Deck based on Id
export async function getDeck(deckId: string): Promise<TDeck> {
  const response = await fetch(`${API_URL}/decks/${deckId}`);
  return response.json();
}