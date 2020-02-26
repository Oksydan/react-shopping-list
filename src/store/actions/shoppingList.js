import * as actionTypes from './actionTypes';
import {firestore, firebaseAuth} from '../../config/fbConfig';

export const addList = (listName, id, authorID) => {
    return dispatch => {
        const   dateAdd = Date.now(),
                dateEdit = Date.now();

        firestore.collection("shoppingList").doc(id).set({
            listName,
            id,
            dateAdd,
            dateEdit,
            authorID,
            listElems: 0,
            checkedElems: 0
        })
        .catch(error => {
            console.error(error);
        });
    }
};

export const listAdded = (listName, id, dateAdd, dateEdit, authorID, listElems, checkedElems) => {
    return {
        type: actionTypes.ADD_LIST,
        listName,
        id,
        dateAdd,
        dateEdit,
        authorID,
        listElems,
        checkedElems
    }
}

export const fetchListStart = () => {
    return {
        type: actionTypes.FETCH_LIST_START
    }
}

export const fetchListEnd = () => {
    return {
        type: actionTypes.FETCH_LIST_END
    }
}

export const fetchList = () => {
    return dispatch => {
        dispatch(fetchListStart());
        const userid = firebaseAuth.currentUser.uid;
        
        firestore.collection("shoppingList").where("authorID", "==", userid)
            .onSnapshot({ includeMetadataChanges: true }, snapshot => {

                snapshot.docChanges().forEach(change => {
                    const data = change.doc.data(),
                        { id, authorID, dateAdd, dateEdit, listName, checkedElems, listElems } = data;
                        // source = change.doc._hasPendingWrites ? 'local' : 'server';

                    if (change.type === "added") {
                        dispatch(listAdded(
                            listName,
                            id,
                            dateAdd,
                            dateEdit,
                            authorID,
                            listElems,
                            checkedElems
                        ))
                        dispatch(fetchListEnd());
                    }
                    if (change.type === "modified") {
                        dispatch(updateShoppingListElement(data));
                    }
                    if (change.type === "removed") {
                        dispatch(removeListData(id));
                    }

                });

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
            .catch(error => {
                console.error(error);
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
                console.error(error);
            });
    }
};



export const eraseShoppingLists = () => {
    return {
        type: actionTypes.ERASE_SHOPPING_LISTS
    }
}