import React, { Component } from 'react';
import ShoppingListForm from '../ShoppingListForm/ShoppingListForm';
import ShoppingList from '../ShoppingList/ShoppingList';

class ShoppingLists extends Component {

    render() {
        return (
            
            <div>
                <ShoppingListForm />
                <ShoppingList />
                
            </div>
        )
    }
}

export default ShoppingLists;