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

export const eraseError = () => {
    return {
        type: actionTypes.AUTH_ERASE_ERROR
    }
}


export const authSuccessfully = (uid, displayName, email) => {
    return {
        type: actionTypes.AUTH_SUCCESSFULLY,
        uid,
        displayName,
        email
    }
}



export const loginIfUserDataPersist = () => {
    return dispatch => {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                dispatch(authSuccessfully(user.uid, user.displayName, user.email));
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
                    return dispatch(register(
                        email.value,
                        password.value,
                        name.value
                        ));
                } else {
                    return dispatch(login(
                        email.value,
                        password.value
                        ));
                }
            })
            .catch(error => {
                dispatch(authError(error.message))
            });
        }
}

export const updateUserData = (newName) => {

    return dispatch => {
        const user = firebaseAuth.currentUser,
            { displayName } = user,
            name = newName.value;


        if (name !== displayName) {
            dispatch(authStart());
            user.updateProfile({
                displayName: name
            })
            .then(() => {
                dispatch(userDataUpdated(name));
            })
            .catch(error => {
                    dispatch(authError(error.message))
            })
            
        }
    }
}

export const userDataUpdated = (displayName) => {
    return {
        type: actionTypes.AUTH_USER_DATA_UPDATED,
        displayName
    }
}

export const updateUserEmail = (emailField) => {

    return dispatch => {
        const user = firebaseAuth.currentUser,
            { email } = user,
            newEmail = emailField.value;


        if (newEmail !== email) {
            dispatch(authStart());
            user.updateEmail(newEmail)
            .then(() => {
                dispatch(userEmailUpdated(newEmail));
            })
            .catch(error => {
                dispatch(authError(error.message))
            })
            
        }
    }
}

export const userEmailUpdated = (email) => {
    return {
        type: actionTypes.AUTH_USER_EMAIL_UPDATED,
        email
    }
}

export const updateUserPassword = (newPassword) => {

    return dispatch => {
        const user = firebaseAuth.currentUser,
            password = newPassword.value;

        dispatch(authStart());
        user.updatePassword(password)
        .then(() => {
            dispatch(userEmailUpdated(password));
        })
        .catch(error => {
                dispatch(authError(error.message))
        })
        
    }
}

export const userPasswordUpdated = (email) => {
    return {
        type: actionTypes.AUTH_USER_PASSWORD_UPDATED
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
                        dispatch(authSuccessfully(res.user.uid, name, email));
                    }).catch(function (error) {
                        dispatch(authError(error.message))
                    });
                }
            })
            .catch(error => {
                dispatch(authError(error.message))
            });

    }
}


export const login = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        firebaseAuth.signInWithEmailAndPassword(email, password)
            .then(res => {
                dispatch(authSuccessfully(res.user.uid, res.user.displayName, email));
            })
            .catch(error => {
                dispatch(authError(error.message))
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