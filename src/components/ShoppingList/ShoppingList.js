import React, { Fragment } from 'react';
import ShoppingListForm from '../../containers/ShoppingListForm/ShoppingListForm';
import ShoppingList from '../../containers/ShoppingList/ShoppingList';
import { Link } from 'react-router-dom';


const shoppingList = () => (
    <Fragment>
        <Link to="/">Back to list</Link>
        <ShoppingListForm />
        <ShoppingList />
    </Fragment>
);


export default shoppingList;