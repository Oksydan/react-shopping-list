import * as actionTypes from '../actions/actionTypes';

const initialState = {
    list: []
}


const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case (actionTypes.LOADING_OVER):
            return state;
        default:
            return state;
    }
}

export default reducer;