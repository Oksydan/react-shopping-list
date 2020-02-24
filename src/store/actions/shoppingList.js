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
            .then(() => {
                dispatch(listAdded(listName, id, dateAdd, dateEdit, authorID, 0, 0));
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
        
        firestore.collection("shoppingList").where("authorID", "==", userid).get()
            .then(querySnapshot => {
                const data = querySnapshot.docs;
                let listArry = [];

                if (data.length > 0) {
                    for (let doc in data) {
                        const list = data[doc].data();
                        listArry = [...listArry, list];
                    }
                }
                
                dispatch(setupListenToChanges(userid));
                dispatch(fetchListEnd());
            })
            .catch(error => {
                console.error(error);
                dispatch(fetchListEnd());
            });

    }
}



// ADDED FOR FUTURE USE
export const setupListenToChanges = (uID) => {
    console.log('LISTEN FOR CHANGES ')
    return dispatch => {
        firestore.collection("shoppingList").where("authorID", "==", uID)
            .onSnapshot({ includeMetadataChanges: false }, snapshot => {

                snapshot.docChanges().forEach(change => {
                    const data = change.doc.data(),
                        { id, authorID, dateAdd, dateEdit, listName, checkedElems, listElems } = data,
                        source = change.doc._hasPendingWrites ? 'local' : 'server';

                    if (source !== 'local') {
                        console.log(source);
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
                        }
                        if (change.type === "modified") {
                            dispatch(updateShoppingListElement(data));
                        }
                        if (change.type === "removed") {
                            dispatch(removeListData(id));
                        }
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
            .then(() => {
                dispatch(removeListData(id));
            })
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
            .then(() => {
                dispatch(listTitleEdited(id, listName, dateEdit));
            })
            .catch(error => {
                console.error(error);
            });
    }
};

export const listTitleEdited = (id, listName, dateEdit) => {
    return {
        type: actionTypes.LIST_TITLE_EDITED,
        listName,
        id,
        dateEdit
    }
}

export const eraseShoppingLists = () => {
    return {
        type: actionTypes.ERASE_SHOPPING_LISTS
    }
}