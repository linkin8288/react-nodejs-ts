import { API_URL } from "./config";

// This line of code delete the Deck based on ID.
export async function deleteDeck(deckId: string) {
  await fetch(`${API_URL}/decks/${deckId}`, {
    method: "DELETE",
  });
}