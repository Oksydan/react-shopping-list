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

        default: 
            return state;

    }
}

export default reducer;