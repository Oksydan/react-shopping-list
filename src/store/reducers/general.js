import * as actionTypes from '../actions/actionTypes';

const initialState = {
    notifications: [],
    loading: false
}

const notificationAdded = (id, textContent, notificationType, addedAt, timeoutId) => ({
    id,
    textContent,
    notificationType,
    addedAt,
    timeoutId
});

const notificationRemoved = (id, list) => {
    const elemIndex = list.findIndex(elem => elem.id === id ? true : false);

    if (elemIndex >= 0) {
        list.splice(elemIndex, 1);
    }

    return list;
}


const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case (actionTypes.LOADING_OVER):
            return {
                ...state,
                loading: false
            }
        case (actionTypes.LOADING_START):
            return {
                ...state,
                loading: true
            }
        case (actionTypes.NOTIFICATION_ADDED):
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    notificationAdded(actions.id,
                        actions.textContent,
                        actions.notificationType,
                        actions.addedAt,
                        actions.timeoutId
                    )
                ]
            }
        case (actionTypes.NOTIFICATION_REMOVED):
            return {
                ...state,
                notifications: notificationRemoved(actions.id, [...state.notifications])
            }
        default:
            return state;
    }
}

export default reducer;