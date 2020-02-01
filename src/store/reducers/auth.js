import * as actionTypes from '../actions/actionTypes';

const initialState = {
    uId: null,
    loading: true,
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
        case (actionTypes.SIGN_OUT_SUCCESSFULLY):
            return {
                ...state,
                loading: false,
                error: '',
                uId: null
            }
        default: 
            return state;
    }
}

export default reducer;