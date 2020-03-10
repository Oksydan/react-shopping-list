import * as actionTypes from './actionTypes';
import * as firebase from 'firebase';
import { firebaseAuth, firestore} from '../../config/fbConfig';
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
        dispatch(action.loadingStart());
        const user = firebaseAuth.currentUser,
            { displayName, uid } = user,
            name = newName.value;


        if (name !== displayName) {
            dispatch(authStart());
            dispatch(action.loadingStart());
            user.updateProfile({
                displayName: name
            })
            .then(() => {
                firestore.collection("users").doc(uid).set({
                    displayName
                }, { merge: true }).then(() => {
                    dispatch(userDataUpdated(name));
                    dispatch(action.loadingOver());
                    dispatch(action.addNotification(
                        'Your account has been changed successfully',
                        'success'
                    ));
                });
                
            })
            .catch(error => {
                dispatch(authError(error.message))
                dispatch(action.loadingOver());
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
            { email, uid } = user,
            newEmail = emailField.value;


        if (newEmail !== email) {
            dispatch(authStart());
            dispatch(action.loadingStart());
            user.updateEmail(newEmail)
            .then(() => {
                firestore.collection("users").doc(uid).set({
                    email: newEmail
                }, { merge: true }).then(() => {
                    dispatch(userEmailUpdated(newEmail));
                    dispatch(action.loadingOver());
                    dispatch(action.addNotification(
                        'Your email adress has been changed successfully',
                        'success'
                    ));
                })
               
            })
            .catch(error => {
                dispatch(authError(error.message));
                dispatch(action.loadingOver());
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
        dispatch(action.loadingStart());
        user.updatePassword(password)
        .then(() => {
            dispatch(userEmailUpdated(password));
            dispatch(action.loadingOver());
            dispatch(action.addNotification(
                'Your password has been changed successfully',
                'success'
            ));
        })
        .catch(error => {
            dispatch(authError(error.message));
            dispatch(action.loadingOver());
        })
        
    }
}

export const userPasswordUpdated = (email) => {
    return {
        type: actionTypes.AUTH_USER_PASSWORD_UPDATED
    }
}

export const resetPasswordEmail = (data) => {
    return dispatch => {
        dispatch(authStart());
        dispatch(action.loadingStart());

        const email = data.email.value;

        firebaseAuth.sendPasswordResetEmail(email)
            .then(() => {
                dispatch(passwordResetSuccessfully());
                dispatch(action.loadingOver());
                dispatch(action.addNotification(
                    'Your password reset message has been sent to your email address',
                    'success'
                ));
            })
            .catch(error => {
                dispatch(authError(error.message));
                dispatch(action.loadingOver());
            });

    }
}

export const passwordResetSuccessfully = () => {
    return {
        type: actionTypes.AUTH_PASSWORD_RESET_SUCCESSFULLY
    }
}



export const register = (email, password, name) => {
    return dispatch => {
        dispatch(authStart());
        dispatch(action.loadingStart());

        firebaseAuth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                const user = firebaseAuth.currentUser,
                    uId = res.user.uid;
                if (user) {
                    user.updateProfile({
                        displayName: name
                    }).then(() => {
                        dispatch(authSuccessfully(uId, name, email));
                        dispatch(action.loadingOver());
                        dispatch(action.addNotification(
                            'New account has been created successfully',
                            'success'
                        ));
                    })
                    .then(() => {
                        firestore.collection("users").doc(uId).set({
                            id: uId,
                            email,
                            displayName: name
                        })
                        .catch(error => {
                            dispatch(action.addNotification(
                                'Something went wrong',
                                'danger'
                            ));
                        });
                    })
                        .catch(error => {
                        dispatch(authError(error.message));
                        dispatch(action.loadingOver());
                    });
                }
            })
            .catch(error => {
                dispatch(authError(error.message));
                dispatch(action.loadingOver());
            });

    }
}


export const login = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        dispatch(action.loadingStart());

        firebaseAuth.signInWithEmailAndPassword(email, password)
            .then(res => {
                dispatch(authSuccessfully(res.user.uid, res.user.displayName, email));
                dispatch(action.loadingOver());
                dispatch(action.addNotification(
                    'You has been logged in successfully',
                    'success'
                ));
            })
            .catch(error => {
                dispatch(authError(error.message));
                dispatch(action.loadingOver());
            });

    }
}

export const signOut = () => {
    return dispatch => {
        dispatch(authStart());
        dispatch(action.loadingStart());

        firebaseAuth.signOut()
            .then(() => {
                dispatch(signOutSuccessfully());
                dispatch(action.eraseList());
                dispatch(action.eraseShoppingLists());
                dispatch(action.loadingOver());
                dispatch(action.addNotification(
                    'You has been logged out successfully',
                    'success'
                ));
            })
            .catch(error => {
                dispatch(authError(error.message));
                dispatch(action.loadingOver());
            });

    }
}


export const signOutSuccessfully = () => {
    return {
        type: actionTypes.SIGN_OUT_SUCCESSFULLY
    }
}