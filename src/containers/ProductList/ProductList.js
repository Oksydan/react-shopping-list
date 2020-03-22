import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductListElement from './ProductListElement/ProductListElement';
import * as action from '../../store/actions';
import { withRouter } from "react-router";
import Button from '../../components/UI/Button/Button';
import { Flipper, Flipped } from "react-flip-toolkit";
import Alert from '../../components/UI/Alert/Alert';



class ProductList extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        if (this.props.shoppingList.length === 0) {
            this.props.history.push('/');
        } else if (!this.props.productList[id]) {
            this.props.fetchProductsList(id);
        }
    }

    render() {
        let list = null,
            listData;
        const information = <Alert text='Add product to your shopping list' type='info' />,
            listId = this.props.match.params.id;


        if (listId) {
            listData = this.props.productList[listId];
            if (typeof listData !== 'undefined') {
                listData = this.props.productList[listId];
                if (listData.length > 0) {
                    listData = listData.sort((a, b) => b.dateAdd - a.dateAdd).sort((a, b) => a.checked - b.checked);
                    list = listData.map((prod) => {
                        return (
                            <Flipped key={prod.id} flipId={prod.id}>
                                {flippedProps => <li {...flippedProps}>
                                    <ProductListElement name={prod.productName} checked={prod.checked} id={prod.id} listId={listId} />
                                </li>}
                            </Flipped>
                        );
                    });
                }
            }
            
        } 

        return (
            <div className="productsList">
                {list ? 
                    <div className="productsList__top">
                        <Button
                            className='productsList__btn button--smaller'
                            displayType="secondary"
                            clicked={() => this.props.removeCheckedProducts(listId)}
                        >Remove checked</Button>
                    </div>
                    :
                    null
                }
                
                {list ? 
                    <Flipper flipKey={listData.map(({ dateEdit, dateAdd }) => dateEdit + dateAdd).join('')}>
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
        removeCheckedProducts: (id) => dispatch(action.removeCheckedProducts(id)),
        fetchProductsList: (id) => dispatch(action.fetchProducts(id))
    }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList));