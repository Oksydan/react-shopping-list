import React from 'react';
import { connect } from 'react-redux';

const shoppingLists = (props) => {
    console.log(props.shopList);
    let list = null;

    if (props.shopList.length > 0) {
        list = props.shopList.map((prod) => {
            console.log(prod);
            return <p key={prod.id}>{prod.productName}</p>;
        });
        console.log(list);
    }
    return (
        <ul>
            <li>
                {list}
            </li>
        </ul>
    )
}

const mapStateToProps = state => {
    return {
        shopList: state.shoppingList.list
    }
}


export default connect(mapStateToProps)(shoppingLists);