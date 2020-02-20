import * as actionTypes from '../actions/actionTypes';

const initialState = {
    uId: null,
    loading: true,
    error: '',
    displayName: '',
    email: ''
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
                email: actions.email
            }
        case (actionTypes.SIGN_OUT_SUCCESSFULLY):
            return {
                ...state,
                loading: false,
                error: '',
                uId: null,
                displayName: '',
                email: ''
            }
        case (actionTypes.AUTH_USER_DATA_UPDATED):
            return {
                ...state,
                loading: false,
                error: '',
                displayName: actions.displayName
            }
        case (actionTypes.AUTH_USER_EMAIL_UPDATED):
            return {
                ...state,
                loading: false,
                error: '',
                email: actions.email
            }
        case (actionTypes.AUTH_USER_PASSWORD_UPDATED):
            return {
                ...state,
                loading: false,
                error: ''
            }
        default: 
            return state;
    }
}

export default reducer;