import * as actionTypes from './actionTypes';
import firebase from  '../../config/fbConfig';


export const addProduct = (productName, id) => {
    return (dispatch, getState) => {
        const   dateAdd = Date.now(),
                dateEdit = Date.now(),
                checked = false,
                order = getState().shoppingList.list.length + 1;

        firebase.collection("list").doc(id).set({
            productName,
            id,
            dateAdd,
            dateEdit,
            checked,
            order
        })
        .then(function () {
            dispatch(productAdded(productName, id, dateAdd, dateEdit, checked, order));
        })
        .catch(function (error) {
            console.error(error);
        });
    }

};

const productAdded = (productName, id, dateAdd, dateEdit, checked, order) => {
    return {
        type: actionTypes.PRODUCT_ADDED,
        productName,
        id,
        dateAdd,
        dateEdit,
        checked,
        order
    }
}

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
export const removeCheckedProducts = () => {
    return {
        type: actionTypes.REMOVE_CHECKED
    }
}