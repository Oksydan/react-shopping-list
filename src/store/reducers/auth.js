import * as actionTypes from '../actions/actionTypes';

const initialState = {
    uId: null,
    loading: true,
    error: '',
    displayName: ''
}


const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case (actionTypes.AUTH_START):
            return {
                ...state,
                loading: true,
                error: ''
            }
        case (actionTypes.AUTH_END):
            return {
                ...state,
                loading: false
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
                uId: actions.uid,
                displayName: actions.displayName,
            }
        case (actionTypes.SIGN_OUT_SUCCESSFULLY):
            return {
                ...state,
                loading: false,
                error: '',
                uId: null,
                displayName: ''
            }
        default: 
            return state;
    }
}

export default reducer;