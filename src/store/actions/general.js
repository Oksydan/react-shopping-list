import * as actionTypes from './actionTypes';
import { getUniqueId } from '../../utils/utils'


export const loadingStart = () => {
    return {
        type: actionTypes.LOADING_START
    }
}

export const loadingOver = () => {
    return {
        type: actionTypes.LOADING_OVER
    }
}


export const notificationAdded = (id, textContent, notificationType, addedAt, timeoutId) => {
    return {
        type: actionTypes.NOTIFICATION_ADDED,
        id,
        textContent,
        notificationType,
        addedAt,
        timeoutId
    }
}

export const addNotification = (text, type) => {
    return dispatch => {
        const id = getUniqueId(),
            addedAt = Date.now(),
            timeoutId = setTimeout(() => {
                dispatch(notificationRemoved(id));
            }, 5000);

        dispatch(notificationAdded(
            id,
            text,
            type,
            addedAt,
            timeoutId
        ))
    }
   
}

export const notificationRemoved = id => {
    return {
        type: actionTypes.NOTIFICATION_REMOVED,
        id
    }
}