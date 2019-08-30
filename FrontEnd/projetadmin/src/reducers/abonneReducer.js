import { GET_ABONNEE } from "../actions/types";

const intitialState = {
  abonnee: {}
};

export default function(state = intitialState, action) {
  switch (action.type) {
    case GET_ABONNEE:
      return {
        ...state,
        abonnee: action.payload
      };

    default:
      return state;
  }
}
