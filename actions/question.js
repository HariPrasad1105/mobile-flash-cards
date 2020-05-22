export const ADD_QUESTION = 'ADD_QUESTION';

export function addQuestion(deckName, cardData) {
  return {
    type: ADD_QUESTION,
    deckName,
    cardData,
  }
}

export function handleAddQuestion(deckName, cardData) {
  return (dispatch) => {
    (dispatch(addQuestion(deckName, cardData)))
  }
}