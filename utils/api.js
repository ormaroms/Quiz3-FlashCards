import { AsyncStorage } from 'react-native'

export function addDeck(newDeck) {
  return AsyncStorage.setItem(newDeck.title, JSON.stringify(newDeck))
}

export function getDecks() {
  return AsyncStorage.getAllKeys().then(allKeys => {
    return AsyncStorage.multiGet(allKeys).then(stores => {
      return stores.map((result, i, store) => {
        let key = store[i][0];
        let value = JSON.parse(store[i][1]);
        if (value) {
          return {
            key,
            title: value.title,
            questions: value.questions
          };
        }
      }).filter(items => {
        if (items) {
          return typeof items.questions !== 'undefined'
        }
      });
    });
  });
}

export function addCardToDeck(deckTitle, newCard) {
    return AsyncStorage.getItem(deckTitle).then(res => {
      let currDeck = JSON.parse(res);
      let questions = currDeck.questions;
      questions.push(newCard)
      return AsyncStorage.mergeItem(deckTitle, JSON.stringify({questions}));
    });
}

export function getDeckByTitle(deckTitle) {
  return AsyncStorage.getItem(deckTitle).then((res) => {
      return JSON.parse(res)
  });
}

export function deleteDeckByTitle(deckTitle) {
    return AsyncStorage.removeItem(deckTitle)
}