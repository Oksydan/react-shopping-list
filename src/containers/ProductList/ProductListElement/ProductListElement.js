import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions';
import PropTypes from 'prop-types';

class ProductListElement extends Component {

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


    handleElementEdit = () => {
        const state = {...this.state};

        this.setState({
            isEditing: true,
            touched: true,
            prevValue: state.value
        });
    }

    handleInputSubmit = (e) => {
        e.preventDefault();
        const { value, prevValue } = { ...this.state };

        if (value !== prevValue) {
            if (value.length > 0) {
                this.setState({
                    isEditing: false,
                    prevValue: value
                }, () => {
                    this.props.listElementUpdate(value, this.props.id);
                    this.input.current.blur();
                });


            } else {
                this.setState({
                    isEditing: false,
                    value: prevValue
                }, () => {
                    this.input.current.blur();
                })
            }
        }
       
    }

    hanldeInputBlur = () => {
        const { value, prevValue } = {...this.state};
        
        if (value !== prevValue) {
            this.setState({
                isEditing: false,
                value: prevValue,
                prevValue: ''
            });
        }
    }

    handleInputChange = () => {
        this.setState({
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
                <form onSubmit={this.handleInputSubmit}>
                    <input
                        checked={this.props.checked}
                        onChange={this.handleProductCheck}
                        type="checkbox" />
                    <input 
                        ref={this.input}
                        type='text'
                        value={this.state.value}
                        onBlur={this.hanldeInputBlur}
                        onFocus={this.handleElementEdit}
                        onChange={this.handleInputChange} />
                    <input type="submit"/>
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

ProductListElement.propTypes = {
    listElementUpdate: PropTypes.func,
    listElementDelete: PropTypes.func,
    listElementCheck: PropTypes.func,
    listElementUncheck: PropTypes.func,
    checked: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

export default connect(null, mapDispatchToProps)(ProductListElement);