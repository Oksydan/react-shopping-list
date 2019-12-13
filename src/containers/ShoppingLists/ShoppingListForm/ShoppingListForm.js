import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';
import { getUniqueId } from '../../../utils/utils';



class shoppingListForm extends Component {
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
            <form onSubmit={this.onSubmit}>
                <input type="text" onChange={this.onInputChange} value={this.state.inputVal} />
                <button type="submit" disabled={!this.state.isInputValid}>Add</button>
            </form>
        );
    }
}



const mapDispatchToProps = dispatch => {
    return {
        onProductAdd: (name, id) => dispatch(action.addProduct(name, id))
    }
}

export default connect(null, mapDispatchToProps)(shoppingListForm);