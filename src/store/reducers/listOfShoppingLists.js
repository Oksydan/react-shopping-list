import * as actionTypes from '../actions/actionTypes';

const initialState = {
    shoppingLists: [],
    loading: false
}


const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case (actionTypes.PRODUCT_ADDED):
            return '';

        default:
            return state;

    }
}

export default reducer;