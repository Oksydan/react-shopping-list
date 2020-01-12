import * as actionTypes from './actionTypes';
import firebase from '../../config/fbConfig';

export const addList = (listName, id) => {
    return dispatch => {
        const   dateAdd = Date.now(),
                dateEdit = Date.now();

        firebase.collection("shoppingList").doc(id).set({
            listName,
            id,
            dateAdd,
            dateEdit
        })
            .then(() => {
                dispatch(listAdded(listName, id, dateAdd, dateEdit));
            })
            .catch(error => {
                console.error(error);
            });
    }
};

export const listAdded = (listName, id, dateAdd, dateEdit) => {
    return {
        type: actionTypes.ADD_LIST,
        listName,
        id,
        dateAdd,
        dateEdit
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
        dispatch(fetchListStart);
        firebase.collection("shoppingList").get()
            .then(doc => {
                const data = doc.docs;
                let listArry = [];

                if (data.length > 0) {
                    for (let doc in data) {
                        const list = data[doc].data();
                        listArry = [...listArry, list];
                    }
                }
                
                dispatch(setList(listArry));
                dispatch(fetchListEnd());
            })
            .catch(error => {
                console.error(error);
                dispatch(fetchListEnd());
            });

    }
}

export const setList = (list) => {
    return {
        type: actionTypes.SET_LIST,
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
        firebase.collection('shoppingList').doc(id).delete()
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
        const dateEdit = Date.now();

        firebase.collection("shoppingList").doc(id).set({
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