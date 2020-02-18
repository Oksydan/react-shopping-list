import * as actionTypes from '../actions/actionTypes';

const initialState = {
    shoppingLists: [],
    loading: false,
    dataFetched: false
}

const addList = (listName, id, dateAdd, dateEdit, authorID, listElems = 0, checkedElems = 0) => ({
    listName,
    id,
    dateAdd,
    dateEdit,
    authorID,
    listElems,
    checkedElems
});

const getListIndexById = (id, list) => {
    return list.findIndex(elem => elem.id === id ? true : false);
}

const deleteListElement = (id, list) => {
    const elemIndex = list.findIndex(elem => elem.id === id ? true : false);

    list.splice(elemIndex, 1);


    return [
        ...list
    ]
}

const editTitle = (id, listName, list) => {
    const elemIndex = getListIndexById(id, list);

    const listUpdated = list;

    listUpdated[elemIndex] = {
        ...listUpdated[elemIndex],
        listName
    };


    return [
        ...listUpdated
    ]
}

const productAdded = (id, list) => {
    const elemIndex = getListIndexById(id, list);

    const listUpdated = list,
        listElems = listUpdated[elemIndex].listElems;


    listUpdated[elemIndex] = {
        ...listUpdated[elemIndex],
        listElems: listElems + 1
    };


    return [
        ...listUpdated
    ]
}

const productRemoved = (id, checked, list) => {
    const elemIndex = getListIndexById(id, list);

    const listUpdated = list,
        listElems = listUpdated[elemIndex].listElems,
        checkedElems = listUpdated[elemIndex].checkedElems;


    let updatedData = {
            listElems: listElems - 1
        };

    if (checked) {
        updatedData = {
            ...updatedData, 
            checkedElems: checkedElems - 1
        }
    }    


    listUpdated[elemIndex] = {
        ...listUpdated[elemIndex],
        ...updatedData
    };


    return [
        ...listUpdated
    ]
}

const productChecked = (id, list) => {
    const elemIndex = getListIndexById(id, list);

    const listUpdated = list,
        checkedElems = listUpdated[elemIndex].checkedElems;


    listUpdated[elemIndex] = {
        ...listUpdated[elemIndex],
        checkedElems: checkedElems + 1
    };


    return [
        ...listUpdated
    ]
}

const productUnchecked = (id, list) => {
    const elemIndex = getListIndexById(id, list);

    const listUpdated = list,
        checkedElems = listUpdated[elemIndex].checkedElems;


    listUpdated[elemIndex] = {
        ...listUpdated[elemIndex],
        checkedElems: checkedElems - 1
    };


    return [
        ...listUpdated
    ]
}

const removeChecked = (id, qty, list) => {
    const elemIndex = getListIndexById(id, list);

    const listUpdated = list,
        checkedElems = listUpdated[elemIndex].checkedElems,
        listElems = listUpdated[elemIndex].listElems;


    listUpdated[elemIndex] = {
        ...listUpdated[elemIndex],
        checkedElems: checkedElems - qty,
        listElems: listElems - qty
    };


    return [
        ...listUpdated
    ]
}


const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case (actionTypes.ADD_LIST):
            return {
                ...state,
                shoppingLists: [
                    ...state.shoppingLists, 
                    addList(actions.listName, actions.id, actions.dateAdd, actions.dateEdit, actions.authorID)
                ]
            };
        case (actionTypes.SET_LIST):
            return {
                ...state,
                shoppingLists: [
                    ...actions.list
                ]
            };
        case (actionTypes.REMOVE_LIST):
            return {
                ...state,
                shoppingLists: deleteListElement(actions.id, [...state.shoppingLists])
            };
        case (actionTypes.LIST_TITLE_EDITED):
            return {
                ...state,
                shoppingLists: editTitle(actions.id, actions.listName, [...state.shoppingLists])
            };
        case (actionTypes.ERASE_SHOPPING_LISTS):
            return {
                shoppingLists: [],
                loading: false
            };
        case (actionTypes.FETCH_LIST_START):
            return {
                ...state,
                loading: true
            };
        case (actionTypes.FETCH_LIST_END):
            return {
                ...state,
                loading: false,
                dataFetched: true
            };
        case (actionTypes.PRODUCT_ADDED):
            return {
                ...state,
                shoppingLists: productAdded(actions.listId, [...state.shoppingLists])
            };
        case (actionTypes.REMOVE_PRODUCT):
            return {
                ...state,
                shoppingLists: productRemoved(actions.listId, actions.checked, [...state.shoppingLists])
            };
        case (actionTypes.CHECK_PRODUCT_ELEM):
            return {
                ...state,
                shoppingLists: productChecked(actions.listId, [...state.shoppingLists])
            };
        case (actionTypes.UNCHECK_PRODUCT_ELEM):
            return {
                ...state,
                shoppingLists: productUnchecked(actions.listId, [...state.shoppingLists])
            };
        case (actionTypes.REMOVE_CHECKED):
            return {
                ...state,
                shoppingLists: removeChecked(actions.listId, actions.removedQty, [...state.shoppingLists])
            };

        default:
            return state;

    }
}

export default reducer;