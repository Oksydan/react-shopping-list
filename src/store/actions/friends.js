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
                            currentUserName = currentUser.displayName,
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
                                reqauthorname: currentUserName,
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


export const fetchFriendsRequests = () => {
    return (dispatch, getState) => {

        dispatch(subscribedToFriendsReuqest());
        const state = getState(),
            userID = state.auth.uId,
            requestRef = firestore.collection("friendsrequest").where('reqtarget', '==', userID);


        requestRef.onSnapshot({ includeMetadataChanges: true }, snapshot => {

            snapshot.docChanges().forEach(change => {
                const data = change.doc.data(),
                    requestId = change.doc.id,
                    { addedAt, reqauthor, reqauthorname } = data;

                if (change.type === "added") {
                    dispatch(friendRequestAdded(requestId, reqauthor, reqauthorname, addedAt));
                }
                
                if (change.type === "removed") {
                    dispatch(friendRequestRemoved(requestId));
                }


            });

        });
    }
}


export const subscribedToFriendsReuqest = () => {
    return {
        type: actionTypes.SUBSCRIBE_TO_FRIENDS_REQUESTS
    }
}

export const friendRequestAdded = (id, requestedUserId, requestedUserName, addedAt) => {
    return {
        type: actionTypes.FRIEND_REQUEST_ADDED,
        id,
        requestedUserId,
        requestedUserName,
        addedAt
    }
}

export const friendRequestRemoved = (id) => {
    return {
        type: actionTypes.FRIEND_REQUEST_REMOVED,
        id
    }
}

export const friendRequestDecline = (id) => {
    return dispatch => {
        console.log('decline',id);
    }
}

export const friendRequestApprove = (id) => {
    return dispatch => {
        console.log('approve', id);
    }
}
