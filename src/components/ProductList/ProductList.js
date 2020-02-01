import React, { Fragment } from 'react';
import ProductListForm from '../../containers/ProductList/ProductListForm/ProductListForm';
import ProductList from '../../containers/ProductList/ProductList';
import { Link } from 'react-router-dom';


const productList = () => (
    <Fragment>
        <Link to="/">Back to list</Link>
        <ProductListForm />
        <ProductList />
    </Fragment>
);


export default productList;