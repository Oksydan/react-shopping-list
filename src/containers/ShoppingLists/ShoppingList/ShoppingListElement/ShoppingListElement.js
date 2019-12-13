import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../../store/actions';

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

    onListElementEdit = (e) => {
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

    onEditValue = () => {

        const state = {...this.state};
        const value = state.value;
        console.log(state);

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

    render() {
        console.log(this.state.isEditing);
        return (
            <li>
                <form>
                    <input 
                        ref={this.input}
                        type='text'
                        readOnly={!this.state.isEditing ? true : false}
                        value={this.state.touched ? this.value : this.props.name}
                        onBlur={this.onEditValue}
                        onChange={this.handleInputChange} />
                    <button onClick={this.onListElementEdit}>edit</button>
                    <button>remove</button>
                </form>
            </li>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        listElementUpdate: (name, id) => dispatch(action.updateProduct(name, id))
    }
}

export default connect(null, mapDispatchToProps)(ShoppingListElement);