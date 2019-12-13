import * as actionTypes from '../actions/actionTypes';

const initialState = {
    list: []
}

const addListElement = (productName, id, dateAdd, dateEdit, checked = false) => ({
    productName,
    id,
    dateAdd,
    dateEdit,
    checked
});

const updateListElement = (productName, id, dateEdit, list) => {
    const elemIndex = list.findIndex(elem => elem.id === id ? true : false);

    const listUpdated = list;

    console.log(productName);

    listUpdated[elemIndex] = {
        ...listUpdated[elemIndex],
        productName,
        dateEdit
    };
    

    return [
        ...listUpdated
    ]
}


const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case (actionTypes.ADD_PRODUCT):
            return {
                ...state,
                list: [
                    ...state.list,
                    addListElement(actions.productName, actions.id, actions.dateAdd, actions.dateEdit)
                ]
            };
        case (actionTypes.UPDATE_PRODUCT):
            return {
                ...state,
                list: updateListElement(actions.productName, actions.id, actions.dateEdit, [...state.list])
            };

        default: 
            return state;

    }
}

export default reducer;