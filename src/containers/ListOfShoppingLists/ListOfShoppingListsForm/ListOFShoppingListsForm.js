import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
import PropTypes from 'prop-types';
import AddElementForm from '../../components/AddElementForm/AddElementForm';



class ShoppingListForm extends Component {
 


    render() {
        return (
            <AddElementForm />
        );
    }
}


export default ShoppingListForm;