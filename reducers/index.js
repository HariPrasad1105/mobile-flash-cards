import { ADD_DECK, DELETE_DECK, RECEIVE_DATA } from '../actions/deck';
import { ADD_QUESTION } from '../actions/question';

export default function decks(state = {}, action) {

  switch (action.type) {
    case ADD_DECK:

      return {
        ...state,
        [action.deckName]: {}
      }

    case DELETE_DECK:
      const {
        [action.deckName]: omit,
        ...res
      } = state;

      return res;

    case ADD_QUESTION:

      return {
        ...state,
        [action.deckName]: {
          ...state[action.deckName],
          questions: state[action.deckName].questions !== undefined
            ? state[action.deckName].questions.concat([{
              question: action.cardData.question,
              answer: action.cardData.answer
            }])
            : [{
              question: action.cardData.question,
              answer: action.cardData.answer,
            }]
        }
      }

    case RECEIVE_DATA:

      return {
        ...action.data
      }

    default:
      return state;
  }
}