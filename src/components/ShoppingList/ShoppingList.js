import React, { Fragment } from 'react';
import ShoppingListForm from '../../containers/ShoppingListForm/ShoppingListForm';
import ShoppingList from '../../containers/ShoppingList/ShoppingList';

const shoppingList = () => (
    <Fragment>
        <ShoppingListForm />
        <ShoppingList />
    </Fragment>
);


export default shoppingList;