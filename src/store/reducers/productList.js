import * as actionTypes from '../actions/actionTypes';

const initialState = {
    list: {},
    loading: false
}

const addListElement = (productName, id, dateAdd, dateEdit, checked = false, list) => {

    return [
        ...list,
        {
            productName,
            id,
            dateAdd,
            dateEdit,
            checked
        }
    ]

};


const deleteListElement = (id, list) => {

    const elemIndex = list.findIndex(elem => elem.id === id ? true : false);

    if (elemIndex >= 0) {
        list.splice(elemIndex, 1);
    }

    return list;
}


const updateListElem = (updatedList, list) => {
    const { id } = updatedList,
        elemIndex = list.findIndex(elem => elem.id === id ? true : false);

    list[elemIndex] = {
        ...updatedList
    }

    return list;
}



const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case (actionTypes.PRODUCT_ADDED):
            return {
                ...state,
                list: {
                    ...state.list,
                    [actions.listId]: addListElement(
                        actions.productName,
                        actions.id,
                        actions.dateAdd,
                        actions.dateEdit,
                        actions.checked,
                        [...(state.list[actions.listId] ? state.list[actions.listId] : [])])
                }
            };
        case (actionTypes.REMOVE_PRODUCT):
            return {
                ...state,
                list: {
                    ...state.list,
                    [actions.listId]: deleteListElement(actions.id, [...state.list[actions.listId]])
                }
            };
        case (actionTypes.UPDATE_PRODUCTS_LIST_ELEM):
            return {
                ...state,
                list: {
                    ...state.list,
                    [actions.listId]: updateListElem(actions.list, [...state.list[actions.listId]])
                }
            };
        case (actionTypes.FETCH_PRODUCTS_START):
            return {
                ...state,
                loading: true
            };
        case (actionTypes.FETCH_PRODUCTS_END):
            return {
                ...state,
                loading: false
            };
        case (actionTypes.ERASE_LIST):
            return {
                list: {},
                loading: false,
                listId: null
            };

        default: 
            return state;

    }
}

export default reducer;