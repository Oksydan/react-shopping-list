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
        const input = e.target;
        const value = input.value.trim();

        console.log(value.length);

        this.setState({
            inputVal: value,
            isInputValid: value.length > 0 ? true : false
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onProductAdd(this.state.inputVal, getUniqueId());
        this.setState({
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