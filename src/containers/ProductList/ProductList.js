import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShoppingListElement from './ProductListElement/ProductListElement';
import * as action from '../../store/actions';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";



class ProductList extends Component {


    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            this.props.fetchProductsList(id);
        } else {
            this.props.history.push('/');
        }
    }

    componentWillUnmount() {
        this.props.clearList();
    }

    render() {
        let list = null;

        if (this.props.shopList.length > 0) {
            list = this.props.shopList.sort((a, b) => a.dateAdd - b.dateAdd).sort((a, b) => a.checked - b.checked).map((prod) => {
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
        shopList: state.productList.list
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeCheckedProducts: () => dispatch(action.removeCheckedProducts()),
        fetchProductsList: (id) => dispatch(action.fetchProducts(id)),
        clearList: () => dispatch(action.eraseList())
    }
}

ProductList.propTypes = {
    shopList: PropTypes.array.isRequired,
    removeCheckedProducts: PropTypes.func,
    fetchProductsList: PropTypes.func
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList));