export const ADD_DECK = 'ADD_DECK'
export const GET_ALL_DECKS = 'GET_ALL_DECKS'
export const DEL_DECK = 'DEL_DECK'
// export const ADD_QUESTION ='ADD_QUESTION'
import { getDecks } from '../utils/api';


// export function getAllDecks() {
//   return (dispatch) => {
//     getDecks().then((data) => {
//         console.log(JSON.stringify(data)) 
//         dispatch({ type: GET_ALL_DECKS, payload: data})});
//   }
// }

export function getAllDecks() {
    let decks = []
    let self = this
    let promise = getDecks()
    return {
        type: GET_ALL_DECKS,
        payload: promise
    }
}

export function addDeckToState (deck) {
    return {
        type: ADD_DECK,
        deck
    }
}