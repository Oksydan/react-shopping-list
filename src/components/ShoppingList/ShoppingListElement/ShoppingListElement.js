import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions';

class ShoppingListElement extends Component {

    constructor(props) {
        super(props);

        this.input = React.createRef();
    }

    state = {
        touched: false,
        value: '',
        isEditing: false,
        editingState: '',
        prevValue: ''
    }

    handleElementEdit = (e) => {
        e.preventDefault();

        this.setState({
            ...this.state,
            isEditing: true,
            touched: true,
            value: this.props.name,
            prevValue: this.props.name
        })

        this.input.current.focus();
    }

    handleInputSubmit = (e) => {
        if(e.keyCode === 13) {
            this.input.current.blur();
        }
    }

    handleEditValue = () => {

        const state = {...this.state};
        const value = state.value;

        if(value.length > 0) {
            this.setState({
                ...state,
                isEditing: false
            })
            this.props.listElementUpdate(value, this.props.id);

        } else {
            this.setState({
                ...state,
                isEditing: false,
                value: state.prevValue
            })
        }
    }

    handleInputChange = () => {

        this.setState({
            ...this.state,
            value: this.input.current.value
        })
    }

    handeDeleteElement = (e) => {
        e.preventDefault();
        this.props.listElementDelete(this.props.id);
    }

    handleProductCheck = (e) => {
        if(e.target.checked) {
            this.props.listElementCheck(this.props.id);
        } else {
            this.props.listElementUncheck(this.props.id);
        }
    }

    render() {
        return (
            <li>
                <form>
                    <input
                        checked={this.props.checked}
                        onChange={this.handleProductCheck}
                        type="checkbox" />
                    <input 
                        ref={this.input}
                        type='text'
                        readOnly={!this.state.isEditing ? true : false}
                        value={this.state.touched ? this.value : this.props.name}
                        onBlur={this.handleEditValue}
                        onKeyUp={this.handleInputSubmit}
                        onChange={this.handleInputChange} />
                    <button onClick={this.handleElementEdit}>edit</button>
                    <button onClick={this.handeDeleteElement}>remove</button>
                </form>
            </li>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        listElementUpdate: (name, id) => dispatch(action.updateProduct(name, id)),
        listElementDelete: (id) => dispatch(action.deleteProduct(id)),
        listElementCheck: (id) => dispatch(action.checkProduct(id)),
        listElementUncheck: (id) => dispatch(action.uncheckProduct(id)),
    }
}

export default connect(null, mapDispatchToProps)(ShoppingListElement);