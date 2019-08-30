import {
  GET_DEMANDE,
  GET_DEMANDEBYID,
  GET_DEMANDEBYCOMPTE,
  GET_DEMANDEBYCOMPTEandSTATUT,
  GET_DEMANDEBYSTATUT,
  GET_DEMANDEBYDATE,
  GET_DEMANDEBYDATEETSTATUT,
  GET_DEMANDEBYDATEETCOMPTE,
  GET_DEMANDEBYDATEETCOMPTEETSTATUT
} from "../actions/types";

const intitialState = {
  demandes: [],
  demande: {}
};

export default function(state = intitialState, action) {
  switch (action.type) {
    case GET_DEMANDE:
      return {
        ...state,
        demandes: action.payload
      };

    case GET_DEMANDEBYID:
      return {
        ...state,
        demande: action.payload
      };

    case GET_DEMANDEBYCOMPTE:
      return {
        ...state,
        demandes: action.payload
        //l'important pour que demandes reçoit les nouvelles valeurs de recherche et qui sera actualisé dans tous les components
      };

    case GET_DEMANDEBYCOMPTEandSTATUT:
      return {
        ...state,
        demandes: action.payload
      };
    case GET_DEMANDEBYSTATUT:
      return {
        ...state,
        demandes: action.payload
      };

    case GET_DEMANDEBYDATE:
      return {
        ...state,
        demandes: action.payload
      };

    case GET_DEMANDEBYDATEETSTATUT:
      return {
        ...state,
        demandes: action.payload
      };
    case GET_DEMANDEBYDATEETCOMPTE:
      return {
        ...state,
        demandes: action.payload
      };
    case GET_DEMANDEBYDATEETCOMPTEETSTATUT:
      return {
        ...state,
        demandes: action.payload
      };

    default:
      return state;
  }
}
