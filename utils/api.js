import { AsyncStorage } from "react-native";

export const STORAGE_KEY = 'mobile-flash-cards:storage';

export function retrieveDeck(deckName) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results);
      return data[deckName];
    })
}

export const retrieveDecks = () => {
  return AsyncStorage.getItem(STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    return data;
  });
};


export const saveDeck = (deckName) => {
  return AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify({ [deckName]: {} })
  );
};

export const saveCard = (deckName, card) => {
  return AsyncStorage.getItem(STORAGE_KEY).then(results => {
    const data = JSON.parse(results);

    // Add card to existing deck data.

    if (data[deckName].questions === undefined) {

      data[deckName] = {
        ...data[deckName],
        questions: [{
          question: card.question,
          answer: card.answer,
        }]
      }
    } else {
      data[deckName] = {
        ...data[deckName],
        questions: data[deckName].questions.concat([{
          question: card.question,
          answer: card.answer,
        }])
      }
    }

    // Save updated deck data back to storage
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  });
};