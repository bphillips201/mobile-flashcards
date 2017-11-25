import { AsyncStorage } from 'react-native'
import shortid from 'shortid';

const DECKS_STORAGE_KEY = 'UdaciCards:decks';

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(res => JSON.parse(res))
    .then(data => data)
}

export function fetchDeck(id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(res => JSON.parse(res))
    .then(data => data[id])
}

export function submitDeckTitle (title, id) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [id]: {
      title,
      questions: []
    }
  }))
}

export function submitCardToDeck (card, deckId) {
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(res => JSON.parse(res))
    .then(data => {
      const deck = data[deckId];
      deck.questions.push(card);
      
      return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [deckId]: {
          ...deck
        }
      }))
    })
}