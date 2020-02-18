import * as actionTypes from './actionTypes';
import {firestore} from  '../../config/fbConfig';

export const fetchProductsStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_START
    }
}
export const fetchProductsEnd = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_END
    }
}

export const fetchProducts = (id) => {
   return dispatch => {
       dispatch(fetchProductsStart());
       firestore.collection("shoppingList").doc(id).collection("list").get()
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
            //    setupListenToChanges();
           })
           .catch(error => {
               console.error(error);
               dispatch(fetchProductsEnd());
           });

   }
}


// ADDED FOR FUTURE USE
export const setupListenToChanges = () => {
    firestore.collection("list")
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

const getShoppingListById = (id, list) => {
    const index = list.findIndex(elem => elem.id === id ? true : false);

    return list[index];
}


export const addProduct = (productName, id) => {
    return (dispatch, getState) => {
        const   dateAdd = Date.now(),
            dateEdit = Date.now(),
            checked = false,
            state = getState(),
            listId = state.productList.listId,
            shoppingLists = state.shoppingList.shoppingLists,
            relatedShoppingList = getShoppingListById(listId ,shoppingLists),
            listElemsInc = relatedShoppingList.listElems + 1,
            batch = firestore.batch();

        const listData = firestore.collection("shoppingList").doc(listId);

        batch.update(listData, { listElems: listElemsInc});

        const productData = firestore.collection("shoppingList").doc(listId).collection("list").doc(id);

        batch.set(productData, {
            productName,
            id,
            dateAdd,
            dateEdit,
            checked
        })

        batch.commit().then(() => {
            dispatch(productAdded(productName, id, listId, dateAdd, dateEdit, checked));
        })
        .catch(error => {
            console.error(error);
        });
    }

};

const productAdded = (productName, id, listId, dateAdd, dateEdit, checked) => {
    return {
        type: actionTypes.PRODUCT_ADDED,
        productName,
        id,
        listId,
        dateAdd,
        dateEdit,
        checked
    }
}

export const updateProduct = (productName, id) => {
    return (dispatch, getState) => {
        const   dateEdit = Date.now(),
                listId = getState().productList.listId;

        firestore.collection("shoppingList").doc(listId).collection("list").doc(id).set({
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

export const deleteProductData = (id, listId, checked) => {
    return {
        type: actionTypes.REMOVE_PRODUCT,
        id,
        listId,
        checked
    }
}

export const deleteProduct = (id, checked) => {
    return (dispatch, getState) => {
        const state = getState(),
            listId = state.productList.listId,
            shoppingLists = state.shoppingList.shoppingLists,
            relatedShoppingList = getShoppingListById(listId, shoppingLists),
            listElemsDec = relatedShoppingList.listElems - 1,
            checkedlistElems = relatedShoppingList.checkedElems,
            batch = firestore.batch();

        const listData = firestore.collection("shoppingList").doc(listId);

        batch.update(listData, { listElems: listElemsDec });

        if (checked) {
            batch.update(listData, { checkedElems: checkedlistElems - 1 });
        }

        const productData = firestore.collection("shoppingList").doc(listId).collection("list").doc(id);

        batch.delete(productData);

        batch.commit()
            .then(() => {
                dispatch(deleteProductData(id, listId, checked));
            })
            .catch(error => {
                console.error(error);
            })
    }
}

export const checkProduct = (id) => {
    return (dispatch, getState) => {
        const state = getState(),
            listId = state.productList.listId,
            shoppingLists = state.shoppingList.shoppingLists,
            relatedShoppingList = getShoppingListById(listId, shoppingLists),
            checkListElemsInc = relatedShoppingList.checkedElems + 1,
            batch = firestore.batch();

        const listData = firestore.collection("shoppingList").doc(listId);

        batch.update(listData, { checkedElems: checkListElemsInc });

        const productData = firestore.collection("shoppingList").doc(listId).collection("list").doc(id);

        batch.set(productData, {
            checked: true
        }, { merge: true });

        batch.commit()
            .then(() => {
                dispatch(checkProductElem(id, listId));
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export const checkProductElem = (id, listId) => {
    return {
        type: actionTypes.CHECK_PRODUCT_ELEM,
        id,
        listId
    }
}

export const uncheckProduct = (id) => {
    return (dispatch, getState) => {
        const state = getState(),
            listId = state.productList.listId,
            shoppingLists = state.shoppingList.shoppingLists,
            relatedShoppingList = getShoppingListById(listId, shoppingLists),
            checkListElemsDec = relatedShoppingList.checkedElems - 1,
            batch = firestore.batch();

        const listData = firestore.collection("shoppingList").doc(listId);

        batch.update(listData, { checkedElems: checkListElemsDec });

        const productData = firestore.collection("shoppingList").doc(listId).collection("list").doc(id);

        batch.set(productData, {
            checked: false
        }, {merge: true});

        batch.commit()
            .then(() => {
                dispatch(uncheckProductElem(id, listId));
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export const uncheckProductElem = (id, listId) => {
    return {
        type: actionTypes.UNCHECK_PRODUCT_ELEM,
        id,
        listId
    }
}

export const removeCheckedProducts = () => {
    return (dispatch, getState) => {
        const checkedElementsId = getState().productList.list.filter(prod => prod.checked).map(prod => prod.id),
            batch = firestore.batch(),
            state = getState(),
            listId = state.productList.listId,
            checkedLength = checkedElementsId.length,
            shoppingLists = state.shoppingList.shoppingLists,
            relatedShoppingList = getShoppingListById(listId, shoppingLists),
            checkListElemsDec = relatedShoppingList.checkedElems - checkedLength,
            ListElemsDec = relatedShoppingList.listElems - checkedLength;

        console.log(checkedLength);
        console.log(relatedShoppingList.checkedElems);

        const listData = firestore.collection("shoppingList").doc(listId);

        batch.update(listData, { 
            checkedElems: checkListElemsDec,
            listElems: ListElemsDec
        });

        for (let i in checkedElementsId) {
            const docRef = firestore.collection("shoppingList").doc(listId).collection("list").doc(checkedElementsId[i]);
            batch.delete(docRef)
        }

        batch.commit()
            .then(() => {
                dispatch(removeCheckedProductsElems(listId, checkedLength));
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const removeCheckedProductsElems = (listId, removedQty) => {
    return {
        type: actionTypes.REMOVE_CHECKED,
        listId,
        removedQty
    }
}

export const eraseList = () => {
    return {
        type: actionTypes.ERASE_LIST
    }
}