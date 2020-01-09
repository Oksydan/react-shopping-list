import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions';
import PropTypes from 'prop-types';

class ShoppingListElement extends Component {

    constructor(props) {
        super(props);

        this.input = React.createRef();
        this.state = {
            value: this.props.name,
            touched: false,
            isEditing: false,
            editingState: '',
            prevValue: ''
        }
    }


    handleElementEdit = (e) => {
        e.preventDefault();

        const state = {...this.state};

        this.setState({
            isEditing: true,
            touched: true,
            prevValue: state.value
        })

        this.input.current.focus();
    }

    handleInputSubmit = (e) => {
        if (e.keyCode === 13) {
            this.input.current.blur();
        }
    }

    handleEditValue = () => {

        const state = {...this.state};
        const value = state.value;

        if(value.length > 0) {
            this.setState({
                isEditing: false
            });

            this.props.listElementUpdate(value, this.props.id);

        } else {
            this.setState({
                isEditing: false,
                value: state.prevValue
            })
        }
    }

    handleInputChange = () => {
        this.setState({
            value: this.input.current.value
        })
        console.log(this.state);
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
                        value={this.state.value}
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

ShoppingListElement.propTypes = {
    listElementUpdate: PropTypes.func,
    listElementDelete: PropTypes.func,
    listElementCheck: PropTypes.func,
    listElementUncheck: PropTypes.func,
    checked: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

export default connect(null, mapDispatchToProps)(ShoppingListElement);