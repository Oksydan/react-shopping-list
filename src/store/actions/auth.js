import * as actionTypes from './actionTypes';
import firebase from '../../config/fbConfig';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authError = error => {
    return {
        type: actionTypes.AUTH_ERROR,
        error
    }
}

export const authEnd = () => {
    return {
        type: actionTypes.AUTH_END
    }
}

export const authSuccessfully = uid => {
    return {
        type: actionTypes.AUTH_END,
        uid
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res);
                dispatch(authEnd());
                dispatch(authSuccessfully());
            })
            .catch(error => {
                console.log(error);
                
                dispatch(authError());
                dispatch(authEnd());
            });

    }


}