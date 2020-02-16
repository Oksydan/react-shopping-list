import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/pro-regular-svg-icons';
import { faCheck } from '@fortawesome/pro-light-svg-icons';

class ProductListElement extends Component {

    constructor(props) {
        super(props);

        this.input = React.createRef();
        this.form = React.createRef();
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

    handleInputSubmit = (e = false) => {
        console.log('sub');
        if(e) {
            e.preventDefault();
        }
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

    handleElementSubmit = (e) => {
        if(e.which === 13) {
            this.handleInputSubmit();
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
        const id = this.props.id,
            checked = this.props.checked;


        let inputClasses = ['productBlock__input'],
            labelClasses = ['productBlock__customCheckbox'];

        if(checked) {
            inputClasses = [...inputClasses, 'productBlock__input--checked'];
            labelClasses = [...labelClasses, 'productBlock__customCheckbox--checked'];
        }


        return (
            <li className="productsList__elem productBlock">
                <form onSubmit={this.handleInputSubmit} className="productBlock__container" ref={this.form}>
                    <label htmlFor={'checkbox' + id} className={labelClasses.join(' ')}>
                        <input
                            className="productBlock__checkbox"
                            id={'checkbox' + id}
                            checked={checked}
                            onChange={this.handleProductCheck}
                            type="checkbox" />
                        <FontAwesomeIcon icon={faCheck} className="productBlock__checkIcon" />
                    </label>
                    <textarea 
                        ref={this.input}
                        className={inputClasses.join(' ')}
                        type='text'
                        value={this.state.value}
                        onKeyUp={this.handleElementSubmit}
                        onBlur={this.hanldeInputBlur}
                        onFocus={this.handleElementEdit}
                        onChange={this.handleInputChange}>
                    ></textarea>
                    <input className="productBlock__submit" type="submit"/>
                    <button className="productBlock__remove" onClick={this.handeDeleteElement}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
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