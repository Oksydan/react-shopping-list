import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductListElement from './ProductListElement/ProductListElement';
import * as action from '../../store/actions';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import Button from '../../components/UI/Button/Button';
import { Flipper, Flipped } from "react-flip-toolkit";



class ProductList extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id && this.props.shoppingList.length > 0) {
            this.props.fetchProductsList(id);
        } else {
            this.props.history.push('/');
        }
    }

    componentWillUnmount() {
        this.props.clearList();
    }


    render() {
        let list = null,
            listData;
        const information = 'Add product to your shopping list';


        if (this.props.productList.length > 0) {
            listData = this.props.productList.sort((a, b) => a.dateAdd - b.dateAdd).sort((a, b) => a.checked - b.checked);
            list = listData.map((prod) => {
                return (
                    <Flipped key={prod.id} flipId={prod.id}>
                        {flippedProps => <li {...flippedProps}>
                            <ProductListElement name={prod.productName} checked={prod.checked} id={prod.id} />
                        </li>}
                    </Flipped>
                );
            });
        } 


        return (
            <div className="productsList">
                <div className="productsList__top">
                    <Button
                        classes={['productsList__btn','button--smaller']}
                        displayType="secondary"
                        clicked={this.props.removeCheckedProducts}
                        >Remove checked</Button>
                </div>
                {list ? 
                    <Flipper flipKey={listData.map(({ dateAdd }) => dateAdd).join('')}>
                        <ul className="productsList__list">
                            {list}
                        </ul>
                    </Flipper >
                    
                :
                    information
                }
                
            </div>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        productList: state.productList.list,
        shoppingList: state.shoppingList.shoppingLists
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
    removeCheckedProducts: PropTypes.func,
    fetchProductsList: PropTypes.func
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList));