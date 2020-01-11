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

export const fetchProducts = (id) => {
   return dispatch => {
       dispatch(fetchProductsStart);
       firebase.collection("shoppingList").doc(id).collection("list").get()
           .then(doc => {
               const   data = doc.docs;
               let dataList = [];
               
               if (data && data.length > 0) {
                   for (let doc in data) {
                       const product = data[doc].data();
                       dataList = [...dataList, product];
                   }
               }
               dispatch(updateProductsList(dataList, id));
               dispatch(fetchProductsEnd());
               setupListenToChanges();
           })
           .catch(error => {
               console.error(error);
               dispatch(fetchProductsEnd());
           });

   }
}


// ADDED FOR FUTURE USE
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

export const updateProductsList = (list, id) => {
    return {
        type: actionTypes.UPDATE_PRODUCTS_LIST,
        list,
        id
    }
}

// ADDED FOR FUTURE USE
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
                order = getState().shoppingList.list.length + 1,
                listId = getState().shoppingList.listId;

        firebase.collection("shoppingList").doc(listId).collection("list").doc(id).set({
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
    return (dispatch, getState) => {
        const   dateEdit = Date.now(),
                listId = getState().shoppingList.listId;

        firebase.collection("shoppingList").doc(listId).collection("list").doc(id).set({
            productName,
            dateEdit
        }, { merge: true })
        .then(() => {
            dispatch(updateProductData(productName, id, dateEdit));
        })
        .catch(error => {
            console.error(error);
        });
    }
}

export const updateProductData = (productName, id, dateEdit) => {
    return {
        type: actionTypes.UPDATE_PRODUCT_DATA,
        productName,
        id,
        dateEdit
    }
}

export const deleteProductData = (id) => {
    return {
        type: actionTypes.REMOVE_PRODUCT,
        id
    }
}

export const deleteProduct = (id) => {
    return (dispatch, getState) => {
        const listId = getState().shoppingList.listId;
        firebase.collection("shoppingList").doc(listId).collection("list").doc(id).delete()
            .then(() => {
                dispatch(deleteProductData(id));
            })
            .catch(error => {
                console.error(error);
            })
    }
}

export const checkProduct = (id) => {
    return (dispatch, getState) => {
        const listId = getState().shoppingList.listId;
        firebase.collection("shoppingList").doc(listId).collection("list").doc(id).set({
            checked: true
        }, { merge: true })
            .then(() => {
                dispatch(checkProductElem(id));
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export const checkProductElem = (id) => {
    return {
        type: actionTypes.CHECK_PRODUCT_ELEM,
        id
    }
}

export const uncheckProduct = (id) => {
    return (dispatch, getState) => {
        const listId = getState().shoppingList.listId;
        firebase.collection("shoppingList").doc(listId).collection("list").doc(id).set({
            checked: false
        }, { merge: true })
            .then(() => {
                dispatch(uncheckProductElem(id));
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export const uncheckProductElem = (id) => {
    return {
        type: actionTypes.UNCHECK_PRODUCT_ELEM,
        id
    }
}

export const removeCheckedProducts = () => {
    return (dispatch, getState) => {
        const   checkedElementsId = getState().shoppingList.list.filter(prod => prod.checked).map(prod => prod.id),
                batch = firebase.batch(),
                listId = getState().shoppingList.listId;

        for (let i in checkedElementsId) {
            const docRef = firebase.collection("shoppingList").doc(listId).collection("list").doc(checkedElementsId[i]);
            batch.delete(docRef)
        }

        batch.commit()
            .then(() => {
                dispatch(removeCheckedProductsElems());
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const removeCheckedProductsElems = () => {
    return {
        type: actionTypes.REMOVE_CHECKED
    }
}