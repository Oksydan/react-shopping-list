import * as actionTypes from './actionTypes';
import { firebaseAuth, firestore } from '../../config/fbConfig';
import * as action from './index';


export const addFriend = (email) => {
    return dispatch => {
        firestore.collection('users').where('email', '==', email).get()
            .then(query => {
                let data;
                query.forEach(doc => {
                    data = doc.data();
                });

                if (data) {
                    (async () => {
                        const reqUid = data.id,
                            currentUser = firebaseAuth.currentUser,
                            currentUserId = currentUser.uid,
                            currentUserEmail = currentUser.email,
                            addedAt = Date.now(),
                            friendRequestRef = firestore.collection('friendsrequest');

                        if (currentUserEmail === email) {
                            dispatch(action.addNotification(
                                'You can\'t send friend request on your email adress',
                                'danger'
                            ));
                        }

                        const firendRequestExists = await friendRequestRef.where('reqauthor', '==', currentUserId)
                            .where('reqtarget', '==', reqUid).get()
                            .then(query => {
                                let data;

                                query.forEach(doc => {
                                    data = doc.data();
                                });

                                if (data) {
                                    return true;
                                } 
                                return false;
                            });

                        if (!firendRequestExists) {
                            friendRequestRef.doc().set({
                                addedAt,
                                reqauthor: currentUserId,
                                reqtarget: reqUid
                            })
                            .then(() => {
                                dispatch(action.addNotification(
                                    'Add to friend request has been sent successfully',
                                    'success'
                                ));
                            })
                            .catch(() => {
                                dispatch(action.addNotification(
                                    'Semething went wrong',
                                    'danger'
                                ));
                            })
                        } else {
                            dispatch(action.addNotification(
                                'You already send friend request on that email address',
                                'danger'
                            ));
                        }
                    })();
                    

                } else {
                    dispatch(action.addNotification(
                        'Account with this email address does not exists',
                        'danger'
                    ));
                }
            })
    }
}