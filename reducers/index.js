import { 
  GET_DECKS,
  ADD_DECK_TITLE,
  ADD_CARD_TO_DECK 
} from '../actions';

function decks (state = {}, action) {
  switch (action.type) {
    case GET_DECKS : 
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK_TITLE :
      const { title, id } = action;
      return {
        ...state,
        [id]: {
          title: title,
          questions: []
        }
      }
    case ADD_CARD_TO_DECK :
      const { card, deckId } = action;
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: [
            ...state[deckId]['questions'],
            card
          ]
        }
      }
    default :
      return state
  }
}

export default decks;