import * as actionTypes from './actionTypes';
import * as firebase from 'firebase';
import {firebaseAuth} from '../../config/fbConfig';
import * as action from './index';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authEnd = () => {
    return {
        type: actionTypes.AUTH_END
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
            } else {
                dispatch(authEnd());
            }
        });
    }
}



export const auth = (data, type) => {

    return dispatch => {
        firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                const { email, password, name} = data;

                if (type === 'register') {
                    return dispatch(register(email, password, name));
                } else {
                    return dispatch(login(email, password));
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
}

export const register = (email, password, name) => {
    return dispatch => {
        dispatch(authStart());

        firebaseAuth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                const user = firebaseAuth.currentUser;
                if (user) {
                    user.updateProfile({
                        displayName: name
                    }).then(function () {
                        dispatch(authSuccessfully(res.user.uid));
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
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