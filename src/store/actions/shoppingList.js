import * as actionTypes from './actionTypes';
import { firestore, firebaseAuth } from '../../config/fbConfig';
import * as action from './index';

export const fetchListStart = () => {
    return {
        type: actionTypes.FETCH_LIST_START
    }
}

export const addList = (listName, id, authorID) => {
    return dispatch => {
        const dateAdd = Date.now(),
            dateEdit = Date.now(),
            hasPermission = [authorID]

        firestore.collection("shoppingList").doc(id).set({
            listName,
            id,
            dateAdd,
            dateEdit,
            authorID,
            hasPermission,
            listElems: 0,
            checkedElems: 0
        })
        .catch(error => {
            dispatch(action.addNotification('Something went wrong', 'danger'));
        });
    }
};

export const listAdded = (listName, id, dateAdd, dateEdit, authorID, listElems, checkedElems, hasPermission) => {
    return {
        type: actionTypes.ADD_LIST,
        listName,
        id,
        dateAdd,
        dateEdit,
        authorID,
        listElems,
        checkedElems,
        hasPermission
    }
}


export const fetchList = () => {
    return dispatch => {
        dispatch(fetchListStart());
        dispatch(action.loadingStart());
        const userid = firebaseAuth.currentUser.uid;

        let hasToStopLoading = true;

        firestore.collection("shoppingList").where("hasPermission", "array-contains", userid).get()
            .then(querySnapshot => {
                const data = querySnapshot.docs;
                if(data.length === 0) {
                    hasToStopLoading = false;
                    dispatch(action.loadingOver());
                }
            })
            .catch(error => {
                dispatch(action.addNotification('Something went wrong', 'danger'));
            });
        
        firestore.collection("shoppingList").where("hasPermission", "array-contains", userid)
            .onSnapshot({ includeMetadataChanges: true }, snapshot => {

                snapshot.docChanges().forEach(change => {
                    const data = change.doc.data(),
                        { id, authorID, dateAdd, dateEdit, listName, checkedElems, listElems, hasPermission } = data;

                    if (change.type === "added") {
                        dispatch(listAdded(
                            listName,
                            id,
                            dateAdd,
                            dateEdit,
                            authorID,
                            listElems,
                            checkedElems,
                            hasPermission
                        ))
                    }
                    if (change.type === "modified") {
                        dispatch(updateShoppingListElement(data));
                    }
                    if (change.type === "removed") {
                        dispatch(removeListData(id));
                    }


                });

                if (hasToStopLoading) {
                    hasToStopLoading = false;
                    dispatch(action.loadingOver());
                }

            });
    }
}




export const updateShoppingListElement = (list) => {
    return {
        type: actionTypes.UPDATE_SHOPPING_LIST_ELEMENT,
        list
    }
}


export const removeListData = (id) => {
    return {
        type: actionTypes.REMOVE_LIST,
        id
    }
}

export const removeList = (id) => {
    return dispatch => {
        firestore.collection('shoppingList').doc(id).delete()
            .then(() => {
                dispatch(action.addNotification('Shopping list has been removed successfully', 'success'));
            })
            .catch(error => {
                dispatch(action.addNotification('Something went wrong', 'danger'));
            })
    }
}


export const editListTitle = (id, listName) => {
    return dispatch => {
        const   dateEdit = Date.now();

        firestore.collection("shoppingList").doc(id).set({
            listName,
            dateEdit
        }, { merge: true })
            .catch(error => {
                dispatch(action.addNotification('Something went wrong', 'danger'));
            });
    }
};



export const eraseShoppingLists = () => {
    return {
        type: actionTypes.ERASE_SHOPPING_LISTS
    }
}