import * as actionTypes from './actionTypes';
import { firestore } from '../../config/fbConfig';
import * as action from './index';


export const fetchProducts = listId => {
   return dispatch => {
       dispatch(action.loadingStart());

       let hasToStopLoading = true;

       firestore.collection("shoppingList").doc(listId).collection("list").get()
           .then(querySnapshot => {
               const data = querySnapshot.docs;
               if (data.length === 0) {
                   hasToStopLoading = false;
                   dispatch(action.loadingOver());
               }
           });


       firestore.collection("shoppingList").doc(listId).collection("list")
           .onSnapshot({ includeMetadataChanges: true }, snapshot => {

               snapshot.docChanges().forEach(change => {
                   const data = change.doc.data(),
                       { id, productName, dateAdd, dateEdit, checked } = data;


                    if (change.type === "added") {
                        dispatch(productAdded(productName, id, listId, dateAdd, dateEdit, checked));
                    }
                    if (change.type === "modified") {
                        dispatch(updateProductsListElem(data, listId));
                    }
                    if (change.type === "removed") {
                        dispatch(deleteProductData(id, listId));
                    }

               });

               if (hasToStopLoading) {
                   hasToStopLoading = false;
                   dispatch(action.loadingOver());
               }

           });
   }
}



export const updateProductsListElem = (list, listId) => {
    return {
        type: actionTypes.UPDATE_PRODUCTS_LIST_ELEM,
        list,
        listId
    }
}


const getShoppingListById = (id, list) => {
    const index = list.findIndex(elem => elem.id === id ? true : false);

    return list[index];
}


export const addProduct = (productName, id, listId) => {
    return (dispatch, getState) => {
        const   dateAdd = Date.now(),
            dateEdit = Date.now(),
            checked = false,
            state = getState(),
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

        batch.commit()
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

export const updateProduct = (productName, id, listId) => {
    return dispatch => {
        const  dateEdit = Date.now();

        firestore.collection("shoppingList").doc(listId).collection("list").doc(id).set({
            productName,
            dateEdit
        }, { merge: true })
        .catch(error => {
            console.error(error);
        });
    }
}


export const deleteProductData = (id, listId) => {
    return {
        type: actionTypes.REMOVE_PRODUCT,
        id,
        listId
    }
}

export const deleteProduct = (id, checked, listId) => {
    return (dispatch, getState) => {
        const state = getState(),
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
            .catch(error => {
                console.error(error);
            })
    }
}

export const checkProduct = (id, listId) => {
    return (dispatch, getState) => {
        const state = getState(),
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
            .catch(error => {
                console.error(error);
            });
    }
}


export const uncheckProduct = (id, listId) => {
    return (dispatch, getState) => {
        const state = getState(),
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
            .catch(error => {
                console.error(error);
            });
    }
}


export const removeCheckedProducts = listId => {
    return (dispatch, getState) => {
        const
            state = getState(),
            checkedElementsId = state.productList.list[listId].filter(prod => prod.checked).map(prod => prod.id),
            batch = firestore.batch(),
            checkedLength = checkedElementsId.length,
            shoppingLists = state.shoppingList.shoppingLists,
            relatedShoppingList = getShoppingListById(listId, shoppingLists),
            checkListElemsDec = relatedShoppingList.checkedElems - checkedLength,
            ListElemsDec = relatedShoppingList.listElems - checkedLength;


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
            .catch(error => {
                console.log(error);
            })
    }
}



export const eraseList = () => {
    return {
        type: actionTypes.ERASE_LIST
    }
}