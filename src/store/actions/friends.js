import * as actionTypes from './actionTypes';
import { firebaseAuth, firestore } from '../../config/fbConfig';
import * as action from './index';


export const addFriendRequest = (email) => {
    return (dispatch, getState) => {
        
        firestore.collection('users').where('email', '==', email).get()
            .then(query => {
                let data;
                query.forEach(doc => {
                    data = doc.data();
                });

                if (data) {

                    const state = getState(),
                        reqUid = data.id,
                        friendsList = state.friends.friendsList,
                        youAreAlreadyFriends = friendsList.findIndex(friend => friend.friendId === reqUid) >= 0 ? true : false;

                    if (youAreAlreadyFriends) {
                        dispatch(action.addNotification(
                            'Your are already friends',
                            'danger'
                        ));
                        return;
                    }
                    

                    (async () => {
                        const currentUser = firebaseAuth.currentUser,
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

                        const firendRequestExists = await friendRequestRef
                            .where('reqauthor', '==', currentUserId)
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
        firestore.collection("friendsrequest").doc(id).delete()
            .then(() => {
                dispatch(action.addNotification(
                    'Friend request has been declined successfully',
                    'success'
                ));
            })
            .catch(() => {
                dispatch(action.addNotification(
                    'Something went wrong',
                    'danger'
                ));
            })
    }
}

export const friendRequestApprove = (id, requestedUserId, requestedUserName) => {
    return dispatch => {
        const batch = firestore.batch(),
            currentUser = firebaseAuth.currentUser,
            { uid, displayName } = currentUser;

        const freindshipRef = firestore.collection('friendship').doc();

        batch.set(freindshipRef, {
            user1: requestedUserId,
            user2: uid,
            user1name: requestedUserName,
            user2name: displayName
        });

        const freindRequestRef = firestore.collection("friendsrequest").doc(id);

        batch.delete(freindRequestRef);

        batch.commit()
            .catch(() => {
                dispatch(action.addNotification('Something went wrong', 'danger'));
            });
    }
}

export const subscribedToFriends = () => {
    return {
        type: actionTypes.SUBSCRIBE_TO_FRIENDS
    }
}


export const fetchFriends = () => {
    return (dispatch, getState) => {
        dispatch(subscribedToFriends());
        const state = getState(),
            userID = state.auth.uId,
            friends1Ref = firestore.collection("friendship")
                .where('user1', '==', userID),
            friends2Ref = firestore.collection("friendship")
                .where('user2', '==', userID);

        dispatch(subscribeToFriend(friends1Ref));
        dispatch(subscribeToFriend(friends2Ref));
        
    }
}

const subscribeToFriend = ref => {
    return dispatch => {

        const currentUser = firebaseAuth.currentUser,
            currentUserId = currentUser.uid;

        ref.onSnapshot({ includeMetadataChanges: true }, snapshot => {

            snapshot.docChanges().forEach(change => {
                const data = change.doc.data(),
                    friendshipId = change.doc.id,
                    whichUser = data.user1 === currentUserId ? '2' : '1',
                    friendId = data[`user${whichUser}`],
                    friendName = data[`user${whichUser}name`];


                if (change.type === "added") {
                    dispatch(friendAdded(friendshipId, friendId, friendName));
                }

                if (change.type === "removed") {
                    dispatch(friendRemoved(friendshipId));
                }

            });
        });
    }
}

const friendAdded = (friendshipId, friendId, friendName) => {
    return {
        type: actionTypes.FRIEND_ADDED,
        friendshipId,
        friendId,
        friendName
    }
}

const friendRemoved = (friendshipId) => {
    return {
        type: actionTypes.FRIEND_REMOVED,
        friendshipId
    }
}