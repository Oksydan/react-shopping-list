import * as actionTypes from './actionTypes';


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