import * as actionTypes from './actionTypes';
import firebase from  '../../config/fbConfig';

export const fetchProductsStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_START
    }
}
export const fetchProductsEnd = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_START
    }
}

export const fetchProducts = () => {
   return dispatch => {
       dispatch(fetchProductsStart);
       firebase.collection("list").get()
           .then(function (doc) {
                const   data = doc.docs;
                let dataList = [];

               if (data.length > 0) {
                   for (let doc in data) {
                       const product = data[doc].data();
                       dataList = [...dataList, product];
                   }
               }
               dispatch(updateProductsList(dataList));
               dispatch(fetchProductsEnd());
           })
           .catch(function (error) {
               console.error(error);
           });

   }
}

export const updateProductsList = (list) => {
    return {
        type: actionTypes.UPDATE_PRODUCTS_LIST,
        list
    }
}


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