import * as actionTypes from '../actions/actionTypes';

const initialState = {
    list: {},
    loading: false,
    listId: null
}

const addListElement = (productName, id, dateAdd, dateEdit, list) => {

    return [
        ...list,
        {
            productName,
            id,
            dateAdd,
            dateEdit,
            checked: false
        }
    ]

};

const updateListElement = (productName, id, dateEdit, list) => {

    const elemIndex = list.findIndex(elem => elem.id === id ? true : false);
   
    list[elemIndex] = {
        ...list[elemIndex],
        productName,
        dateEdit
    }
    

    return list;
}

const deleteListElement = (id, list) => {

    const elemIndex = list.findIndex(elem => elem.id === id ? true : false);

    if (elemIndex >= 0) {
        list.splice(elemIndex, 1);
    }

    return list;
}

const checkListElement = (id, list) => {
    const elemIndex = list.findIndex(elem => elem.id === id ? true : false);

    list[elemIndex] = {
        ...list[elemIndex],
        checked: true
    }


    return list;
}

const uncheckListElement = (id, list) => {
    const elemIndex = list.findIndex(elem => elem.id === id ? true : false);

    list[elemIndex] = {
        ...list[elemIndex],
        checked: false
    }


    return list;
}

const removeCheckedProducts = (list) => {
    list = list.filter(prod => !prod.checked);

    return list;
}


const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case (actionTypes.PRODUCT_ADDED):
            return {
                ...state,
                list: {
                    ...state.list,
                    [state.listId]: addListElement(actions.productName, actions.id, actions.dateAdd, actions.dateEdit, [...state.list[state.listId]])
                }
            };
        case (actionTypes.UPDATE_PRODUCT_DATA):
            return {
                ...state,
                list: {
                    ...state.list,
                    [state.listId]: updateListElement(actions.productName, actions.id, actions.dateEdit, [...state.list[state.listId]])
                }
                
            };
        case (actionTypes.REMOVE_PRODUCT):
            return {
                ...state,
                list: {
                    ...state.list,
                    [state.listId]: deleteListElement(actions.id, [...state.list[state.listId]])
                }
            };
        case (actionTypes.CHECK_PRODUCT_ELEM):
            return {
                ...state,
                list: {
                    ...state.list,
                    [state.listId]: checkListElement(actions.id, [...state.list[state.listId]])
                }
            };
        case (actionTypes.UNCHECK_PRODUCT_ELEM):
            return {
                ...state,
                list: {
                    ...state.list,
                    [state.listId]: uncheckListElement(actions.id, [...state.list[state.listId]])
                }
            };
        case (actionTypes.REMOVE_CHECKED):
            return {
                ...state,
                list: {
                    ...state.list,
                    [state.listId]: removeCheckedProducts([...state.list[state.listId]])
                }
            };
        case (actionTypes.UPDATE_PRODUCTS_LIST):
            return {
                ...state,
                list: {
                    ...state.list,
                    [actions.id]: actions.list
                },
                listId: actions.id
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