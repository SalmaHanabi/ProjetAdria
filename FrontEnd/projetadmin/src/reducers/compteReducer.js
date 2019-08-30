import {GET_COMPTE} from "../actions/types"

const intitialState ={
    comptes: [],
    compte: {}
};

export default function(state=intitialState, action){
    switch(action.type){

        case GET_COMPTE:
            return {
                ...state,
                comptes:action.payload
            }

        default:
        return state
    }
}