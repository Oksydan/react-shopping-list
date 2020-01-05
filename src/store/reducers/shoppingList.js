import * as actionTypes from '../actions/actionTypes';

const initialState = {
    list: []
}

const addListElement = (productName, id, dateAdd, dateEdit, list) => ({
    productName,
    id,
    dateAdd,
    dateEdit,
    order: list.length + 1,
    checked: false
});

const updateListElement = (productName, id, dateEdit, list) => {
    const elemIndex = list.findIndex(elem => elem.id === id ? true : false);

    const listUpdated = list;

    listUpdated[elemIndex] = {
        ...listUpdated[elemIndex],
        productName,
        dateEdit
    };
    

    return [
        ...listUpdated
    ]
}

const deleteListElement = (id, list) => {
    const elemIndex = list.findIndex(elem => elem.id === id ? true : false);

    list.splice(elemIndex, 1);
    
    
    return [
        ...list
    ]
}

const checkListElement = (id, list) => {
    const elemIndex = list.findIndex(elem => elem.id === id ? true : false);

    const listUpdated = list;

    listUpdated[elemIndex] = {
        ...listUpdated[elemIndex],
        checked: true
    };


    return [
        ...listUpdated
    ]
}

const uncheckListElement = (id, list) => {
    const elemIndex = list.findIndex(elem => elem.id === id ? true : false);

    const listUpdated = list;

    listUpdated[elemIndex] = {
        ...listUpdated[elemIndex],
        checked: false
    };


    return [
        ...listUpdated
    ]
}

const removeCheckedProducts = (list) => {
    const filteredList = list.filter(prod => !prod.checked);

    return filteredList;
}


const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case (actionTypes.ADD_PRODUCT):
            return {
                ...state,
                list: [
                    ...state.list,
                    addListElement(actions.productName, actions.id, actions.dateAdd, actions.dateEdit, state.list)
                ]
            };
        case (actionTypes.UPDATE_PRODUCT):
            return {
                ...state,
                list: updateListElement(actions.productName, actions.id, actions.dateEdit, [...state.list])
            };
        case (actionTypes.REMOVE_PRODUCT):
            return {
                ...state,
                list: deleteListElement(actions.id, [...state.list])
            };
        case (actionTypes.CHECK_PRODUCT):
            return {
                ...state,
                list: checkListElement(actions.id, [...state.list])
            };
        case (actionTypes.UNCHECK_PRODUCT):
            return {
                ...state,
                list: uncheckListElement(actions.id, [...state.list])
            };
        case (actionTypes.REMOVE_CHECKED):
            return {
                ...state,
                list: removeCheckedProducts([...state.list])
            };

        default: 
            return state;

    }
}

export default reducer;