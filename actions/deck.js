export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const RECEIVE_DATA = 'RECEIVE_DATA';

export function addDeck(deckName) {
  return {
    type: ADD_DECK,
    deckName: deckName.trim(),
  }
}

export function deleteDeck(deckName) {
  return {
    type: DELETE_DECK,
    deckName: deckName.trim(),
  }
}

export function receiveData(data) {
  return {
    type: RECEIVE_DATA,
    data,
  }
}

export function handleAddDeck(deckName) {
  return (dispatch) => {
    dispatch(addDeck(deckName))
  }
}

export function handleDeleteDeck(deckName) {
  return (dispatch) => {
    dispatch(deleteDeck(deckName))
  }
}

export function handleReceiveData(data) {
  return (dispatch) => {
    dispatch(receiveData(data))
  }
}