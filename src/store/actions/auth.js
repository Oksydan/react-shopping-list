import * as actionTypes from './actionTypes';
import {firebaseAuth} from '../../config/fbConfig';

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


export const authSuccessfully = uid => {
    return {
        type: actionTypes.AUTH_SUCCESSFULLY,
        uid
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        firebaseAuth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res.user.uid);
                dispatch(authSuccessfully(res.user.uid));
            })
            .catch(error => {
                console.log(error);
                
                dispatch(authError());
            });

    }


}