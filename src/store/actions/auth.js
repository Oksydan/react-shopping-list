import * as actionTypes from './actionTypes';
import * as firebase from 'firebase';
import {firebaseAuth} from '../../config/fbConfig';
import * as action from './index';

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

export const loginIfUserDataPersist = () => {
    return dispatch => {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                dispatch(authSuccessfully(user.uid));
            } 
        });
    }
}



export const auth = (email, password, type) => {

    return dispatch => {
        firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                if (type === 'register') {
                    return dispatch(register(email, password));
                } else {
                    return dispatch(login(email, password));
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
}

export const register = (email, password) => {
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

export const login = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        firebaseAuth.signInWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res);
                dispatch(authSuccessfully(res.user.uid));
            })
            .catch(error => {
                console.log(error);
                
                dispatch(authError());
            });

    }
}

export const signOut = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        firebaseAuth.signOut()
            .then(() => {
                dispatch(signOutSuccessfully());
                dispatch(action.eraseList());
                dispatch(action.eraseShoppingLists());
            })
            .catch(error => {
                console.log(error);
                dispatch(authError());
            });

    }
}


export const signOutSuccessfully = () => {
    return {
        type: actionTypes.SIGN_OUT_SUCCESSFULLY
    }
}