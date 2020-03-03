import * as actionTypes from '../actions/actionTypes';

const initialState = {
    notifications: [],
    loading: false
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case (actionTypes.LOADING_OVER):
            return {
                ...state,
                loading: false
            }
        case (actionTypes.LOADING_START):
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default reducer;