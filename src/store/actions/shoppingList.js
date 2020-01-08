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
           .then(doc => {
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
               setupListenToChanges();
           })
           .catch(error => {
               console.error(error);
           });

   }
}


// SETUP FOR FEATURE USE
export const setupListenToChanges = () => {
    firebase.collection("list")
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(function (change) {
                // if (change.type === "added") {
                //     console.log("New product element: ", change.doc.data());
                // }
                // if (change.type === "modified") {
                //     console.log("Modified product element: ", change.doc.data());
                // }
                // if (change.type === "removed") {
                //     console.log("Removed product element: ", change.doc.data());
                // }
            });
            // return dispatch => {

            // }
        });

}

export const updateProductsList = (list) => {
    return {
        type: actionTypes.UPDATE_PRODUCTS_LIST,
        list
    }
}

// SETUP FOR FEATURE USE
export const updateProductsListElement = (product) => {
    return {
        type: actionTypes.UPDATE_PRODUCTS_LIST_ELEMENT,
        product
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
        .then(() => {
            dispatch(productAdded(productName, id, dateAdd, dateEdit, checked, order));
        })
        .catch(error => {
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

export const deleteProductData = (id) => {
    return {
        type: actionTypes.REMOVE_PRODUCT,
        id
    }
}

export const deleteProduct = (id) => {
    return dispatch => {
        dispatch(deleteProductData(id));

        firebase.collection('list').doc(id).delete()
            .then(() => {
                console.log('succesufly deleted');
            })
            .catch(error => {
                console.error(error);
            })
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