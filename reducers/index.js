import { ADD_DECK, GET_ALL_DECKS } from '../actions'

const FETCH_FINISH_SUFFIX = '_FULFILLED'

export default (state = {}, action) => {
  switch (action.type) {
    case (GET_ALL_DECKS+FETCH_FINISH_SUFFIX):
      return action.payload;
    default:
      return state;
  }
};
