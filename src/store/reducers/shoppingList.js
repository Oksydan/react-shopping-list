import * as actionTypes from '../actions/actionTypes';

const initialState = {
    shoppingLists: [],
    dataSubscribed: false
}

const addList = (listName, id, dateAdd, dateEdit, authorID, listElems = 0, checkedElems = 0, hasPermission) => ({
    listName,
    id,
    dateAdd,
    dateEdit,
    authorID,
    listElems,
    checkedElems,
    hasPermission
});

const getListIndexById = (id, list) => {
    return list.findIndex(elem => elem.id === id ? true : false);
}

const deleteListElement = (id, list) => {
    const elemIndex = list.findIndex(elem => elem.id === id ? true : false);

    if (elemIndex >= 0) {
        list.splice(elemIndex, 1);
    }

    return [
        ...list
    ]
}


const updateShoppingListElem = (updatedList, prevList) => {
    const id = updatedList.id,
        elemIndex = getListIndexById(id, prevList);

    prevList[elemIndex] = updatedList;

    return prevList;
}


const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case (actionTypes.ADD_LIST):
            return {
                ...state,
                shoppingLists: [
                    ...state.shoppingLists, 
                    addList(actions.listName, actions.id, actions.dateAdd, actions.dateEdit, actions.authorID, actions.listElems, actions.checkedElems, actions.hasPermission)
                ]
            };
        case (actionTypes.REMOVE_LIST):
            return {
                ...state,
                shoppingLists: deleteListElement(actions.id, [...state.shoppingLists])
            };
        case (actionTypes.ERASE_SHOPPING_LISTS):
            return {
                shoppingLists: []
            };
        case (actionTypes.FETCH_LIST_START):
            return {
                ...state,
                dataSubscribed: true
            };
        case (actionTypes.UPDATE_SHOPPING_LIST_ELEMENT):
            return {
                ...state,
                shoppingLists: updateShoppingListElem(actions.list, [...state.shoppingLists])
            };
        default:
            return state;

    }
}

export default reducer;