import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'UdaciCards:decks';

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY);
}