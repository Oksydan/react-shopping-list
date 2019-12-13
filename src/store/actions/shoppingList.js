import * as actionTypes from './actionTypes';

export const addProduct = (productName, id) => {
    return {
        type: actionTypes.ADD_PRODUCT,
        productName,
        id,
        dateAdd: Date.now(),
        dateEdit: Date.now()
    }
} 