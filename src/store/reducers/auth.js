import * as actionTypes from '../actions/actionTypes';

const initialState = {
    uId: '',
    loading: false,
    error: ''
}


const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case (actionTypes.AUTH_START):
            return {
                ...state,
                loading: true,
                error: ''
            }
        case (actionTypes.AUTH_ERROR):
            return {
                ...state,
                loading: false,
                error: actions.error
            }
        case (actionTypes.AUTH_SUCCESSFULLY):
            return {
                ...state,
                loading: false,
                error: '',
                uId: actions.uid
            }
        default: 
            return state;
    }
}

export default reducer;