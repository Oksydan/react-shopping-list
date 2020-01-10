import React, { Fragment } from 'react';
import List from '../../containers/ListOfShoppingLists/ListOfShoppingLists';
import Form from '../../containers/ListOfShoppingLists/ListOfShoppingListsForm/ListOfShoppingListsForm';

const shoppingList = () => (
    <Fragment>
        <List />
        <Form />
    </Fragment>
);


export default shoppingList;