import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShoppingListElement from './ShoppingListElement/ShoppingListElement';
import * as action from '../../store/actions';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";



class ShoppingLists extends Component {


    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            this.props.fetchProductsList(id);
        } else {
            this.props.history.push('/');
        }
    }

    render() {
        let list = null;

        if (this.props.shopList.length > 0) {
            list = this.props.shopList.sort((a, b) => a.order - b.order).sort((a, b) => a.checked - b.checked).map((prod) => {
                return <ShoppingListElement name={prod.productName} checked={prod.checked} key={prod.id} id={prod.id} />;
            });
        } else {
            list = 'Add product to your shopping list'
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
        fetchProductsList: (id) => dispatch(action.fetchProducts(id))
    }
}

ShoppingLists.propTypes = {
    shopList: PropTypes.array.isRequired,
    removeCheckedProducts: PropTypes.func,
    fetchProductsList: PropTypes.func
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShoppingLists));