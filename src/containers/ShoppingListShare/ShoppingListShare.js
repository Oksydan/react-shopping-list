import React, { Fragment } from 'react';
import ShoppingListShareForm from '../../components/ShoppingListShare/ShoppingListShareForm/ShoppingListShareForm';
import ShoppingListShareFriendsList from '../../components/ShoppingListShare/ShoppingListShareFriendsList/ShoppingListShareFriendsList';

const shoppingListShare = ({ permitedUsers }) => {

    return (
        <Fragment>
            <ShoppingListShareForm />
            <ShoppingListShareFriendsList permitedUsers={permitedUsers} />
        </Fragment>
    );
}

export default shoppingListShare;