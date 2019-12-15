import * as actionTypes from './actionTypes';

export const addProduct = (productName, id) => {
    return {
        type: actionTypes.ADD_PRODUCT,
        productName,
        id,
        dateAdd: Date.now(),
        dateEdit: Date.now()
    }
};

export const updateProduct = (productName, id) => {
    return {
        type: actionTypes.UPDATE_PRODUCT,
        productName,
        id,
        dateEdit: Date.now()
    }
}

export const deleteProduct = (id) => {
    return {
        type: actionTypes.REMOVE_PRODUCT,
        id
    }
}

export const checkProduct = (id) => {
    return {
        type: actionTypes.CHECK_PRODUCT,
        id
    }
}

export const uncheckProduct = (id) => {
    return {
        type: actionTypes.UNCHECK_PRODUCT,
        id
    }
}