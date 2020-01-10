import React, { Fragment } from 'react';
import List from '../../containers/ListOfShoppingLists/ListOfShoppingLists';
import Form from '../../containers/ListOfShoppingLists/ListOfShoppingListsForm/ListOFShoppingListsForm';

const shoppingList = () => (
    <Fragment>
        <Form />
        <List />
    </Fragment>
);


export default shoppingList;