import React, { Fragment } from 'react';
import ProductListForm from '../../containers/ProductList/ProductListForm/ProductListForm';
import ProductList from '../../containers/ProductList/ProductList';


const productList = () => (
    <Fragment>
        <ProductListForm />
        <ProductList />
    </Fragment>
);


export default productList;