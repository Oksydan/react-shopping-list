import React from 'react';
import { connect } from 'react-redux';
import ShoppingListElement from '../ShoppingList/ShoppingListElement/ShoppingListElement';

const shoppingLists = (props) => {
    let list = null;

    if (props.shopList.length > 0) {
        list = props.shopList.map((prod) => {
            return <ShoppingListElement name={prod.productName} key={prod.id} id={prod.id} />;
        });
    }
    return (
        <ul>
            {list}
        </ul>
    )
}

const mapStateToProps = state => {
    return {
        shopList: state.shoppingList.list
    }
}


export default connect(mapStateToProps)(shoppingLists);