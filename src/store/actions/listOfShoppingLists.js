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