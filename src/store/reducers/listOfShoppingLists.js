import * as actionTypes from '../actions/actionTypes';

const initialState = {
    shoppingLists: [],
    loading: false
}

const addList = (listName, id, dateAdd, dateEdit) => ({
    listName,
    id,
    dateAdd,
    dateEdit
});

const deleteListElement = (id, list) => {
    const elemIndex = list.findIndex(elem => elem.id === id ? true : false);

    list.splice(elemIndex, 1);


    return [
        ...list
    ]
}

const editTitle = (id, listName, list) => {
    const elemIndex = list.findIndex(elem => elem.id === id ? true : false);

    const listUpdated = list;

    listUpdated[elemIndex] = {
        ...listUpdated[elemIndex],
        listName
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
                    addList(actions.listName, actions.id, actions.dateAdd, actions.dateEdit)
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

        default:
            return state;

    }
}

export default reducer;