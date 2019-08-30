import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import compteReducer from "./compteReducer";
import demandeReducer from "./demandeReducer";
import abonneReducer from "./abonneReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
  errors: errorReducer,
  compte: compteReducer,
  demande: demandeReducer,
  abonnee: abonneReducer,
  security: securityReducer
});
