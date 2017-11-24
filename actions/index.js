export const ADD_DECK_TITLE = 'ADD_DECK';
export const GET_DECKS = 'GET_DECKS';

export function getDecks (decks) {
  return {
    type: GET_DECKS,
    decks
  }
}

export function addDeckTitle (title, id) {
  return {
    type: ADD_DECK_TITLE,
    id,
    title
  }
}