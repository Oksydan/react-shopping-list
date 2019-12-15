import React from 'react';
import { connect } from 'react-redux';
import ShoppingListElement from './ShoppingListElement/ShoppingListElement';
import * as action from '../../store/actions';
import PropTypes from 'prop-types';



const shoppingLists = (props) => {
    let list = null;

    if (props.shopList.length > 0) {
        list = props.shopList.map((prod) => {
            return <ShoppingListElement name={prod.productName} key={prod.id} id={prod.id} />;
        });
    }
    return (
        <div>
            <button onClick={props.removeCheckedProducts}>Remove checked</button>
            <ul>
                {list}
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        shopList: state.shoppingList.list
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeCheckedProducts: () => dispatch(action.removeCheckedProducts())
    }
}

shoppingLists.propTypes = {
    shopList: PropTypes.array.isRequired,
    removeCheckedProducts: PropTypes.func
};


export default connect(mapStateToProps, mapDispatchToProps)(shoppingLists);