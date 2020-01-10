import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
import { getUniqueId } from '../../utils/utils';
import PropTypes from 'prop-types';
import AddElementForm from '../../components/AddElementForm/AddElementForm';



class ShoppingListForm extends Component {
    state = {
        isInputValid: false,
        inputVal: ''
    }


    onInputChange = (e) => {
        const inputVal = e.target.value;

        this.setState({
            ...this.state,
            inputVal,
            isInputValid: inputVal.length > 0 ? true : false
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const state = {...this.state};
        const valueFormated = state.inputVal.trim();
        if (valueFormated.length > 0) {
            this.props.onProductAdd(this.state.inputVal, getUniqueId());
        } 
        this.setState({
            ...this.state,
            inputVal: '',
            isInputValid: false
        })
    }
    

    render() {
        return (
            <AddElementForm 
                handleSubmit={this.onSubmit} 
                handleInputChange={this.onInputChange} 
                isInputValid={this.state.isInputValid}
                inputVal={this.state.inputVal}
                />
        );
    }
}



const mapDispatchToProps = dispatch => {
    return {
        onProductAdd: (name, id) => dispatch(action.addProduct(name, id))
    }
}

ShoppingListForm.propTypes = {
    onProductAdd: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(ShoppingListForm);