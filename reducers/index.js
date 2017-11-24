import { 
  ADD_DECK_TITLE, 
  GET_DECKS } from '../actions';

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
        [title]: {
          id: id,
          title: title,
          questions: []
        }
      }
    default :
      return state
  }
}

export default decks;