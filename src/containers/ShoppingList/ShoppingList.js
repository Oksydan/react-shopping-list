import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShoppingListElement from './ShoppingListElement/ShoppingListElement';
import * as action from '../../store/actions';
import PropTypes from 'prop-types';



class ShoppingLists extends Component {


    componentDidMount() {
        this.props.fetchProductsList();
    }

    render() {
        let list = null;

        if (this.props.shopList.length > 0) {
            list = this.props.shopList.sort((a, b) => a.order - b.order).sort((a, b) => a.checked - b.checked).map((prod) => {
                return <ShoppingListElement name={prod.productName} checked={prod.checked} key={prod.id} id={prod.id} />;
            });
        }
        return (
            <div>
                <button onClick={this.props.removeCheckedProducts}>Remove checked</button>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        shopList: state.shoppingList.list
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeCheckedProducts: () => dispatch(action.removeCheckedProducts()),
        fetchProductsList: () => dispatch(action.fetchProducts())
    }
}

ShoppingLists.propTypes = {
    shopList: PropTypes.array.isRequired,
    removeCheckedProducts: PropTypes.func,
    fetchProductsList: PropTypes.func
};


export default connect(mapStateToProps, mapDispatchToProps)(ShoppingLists);