import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';
import { getUniqueId } from '../../../utils/utils';
import PropTypes from 'prop-types';
import AddElementForm from '../../../components/AddElementForm/AddElementForm';



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
            this.props.onListAdd(this.state.inputVal, getUniqueId(), this.props.userID);
        } 
        this.setState({
            ...this.state,
            inputVal: '',
            isInputValid: false
        })
    }
    

    render() {

        const conent = (
            this.props.userID !== null ? <AddElementForm
                handleSubmit={this.onSubmit}
                handleInputChange={this.onInputChange}
                isInputValid={this.state.isInputValid}
                inputVal={this.state.inputVal}
            /> : <p>Login to your account to start adding products to your shopping list</p>
        )

        return conent;
    }
}



const mapDispatchToProps = dispatch => {
    return {
        onListAdd: (name, id, authorID) => dispatch(action.addList(name, id, authorID))
    }
}
const mapStateToProps = state => {
    return {
        userID: state.auth.uId
    }
}

ShoppingListForm.propTypes = {
    onListAdd: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListForm);