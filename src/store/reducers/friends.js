import * as actionTypes from '../actions/actionTypes';

const initialState = {
    list: [],
    friendsRequests: [],
    subscribeToFriendsRequests: false
}

const addNewRequest = (id, requestedUserId, requestedUserName, addedAt) => {
    return {
        id,
        requestedUserId,
        requestedUserName,
        addedAt
    }
}

const removeRequest = (id, list) => {
    const elemIndex = list.findIndex(elem => elem.id === id ? true : false);

    if (elemIndex >= 0) {
        list.splice(elemIndex, 1);
    }

    return list;
}


const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case (actionTypes.LOADING_OVER):
            return state;
        case (actionTypes.SUBSCRIBE_TO_FRIENDS_REQUESTS):
            return {
                ...state,
                subscribeToFriendsRequests: true
            };
        case (actionTypes.FRIEND_REQUEST_ADDED):
            return {
                ...state,
                friendsRequests: [
                    ...state.friendsRequests,
                    addNewRequest(actions.id, actions.requestedUserId, actions.requestedUserName, actions.addedAt)
                ]
            };
        case (actionTypes.FRIEND_REQUEST_REMOVED):
            return {
                ...state,
                friendsRequests: removeRequest(actions.id, [...state.friendsRequests])
            };
        default:
            return state;
    }
}

export default reducer;