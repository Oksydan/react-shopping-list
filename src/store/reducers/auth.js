import * as actionTypes from '../actions/actionTypes';

const initialState = {
    uId: null,
    error: '',
    displayName: '',
    email: ''
}


const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case (actionTypes.AUTH_START):
            return {
                ...state,
                error: ''
            }
        case (actionTypes.AUTH_END):
            return {
                ...state
            }
        case (actionTypes.AUTH_ERROR):
            return {
                ...state,
                error: actions.error
            }
        case (actionTypes.AUTH_SUCCESSFULLY):
            return {
                ...state,
                error: '',
                uId: actions.uid,
                displayName: actions.displayName,
                email: actions.email
            }
        case (actionTypes.SIGN_OUT_SUCCESSFULLY):
            return {
                ...state,
                error: '',
                uId: null,
                displayName: '',
                email: ''
            }
        case (actionTypes.AUTH_USER_DATA_UPDATED):
            return {
                ...state,
                error: '',
                displayName: actions.displayName
            }
        case (actionTypes.AUTH_USER_EMAIL_UPDATED):
            return {
                ...state,
                error: '',
                email: actions.email
            }
        case (actionTypes.AUTH_USER_PASSWORD_UPDATED):
            return {
                ...state,
                error: ''
            }
        case (actionTypes.AUTH_ERASE_ERROR):
            return {
                ...state,
                error: ''
            }
        case (actionTypes.AUTH_PASSWORD_RESET_SUCCESSFULLY):
            return {
                ...state,
                error: ''
            }
        default: 
            return state;
    }
}

export default reducer;