import React, { Fragment } from 'react';
import List from '../../containers/ShoppingList/ShoppingList';
import Form from '../../containers/ShoppingList/ShoppingListForm/ShoppingListForm';

const shoppingList = () => (
    <Fragment>
        <Form />
        <List />
    </Fragment>
);


export default shoppingList;