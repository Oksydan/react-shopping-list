import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheck } from '@fortawesome/pro-regular-svg-icons';

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
            prevValue: '',
            height: 0
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
        if(e) {
            e.preventDefault();
        }
        const   state = { ...this.state },
                value = state.value.trim(),
                prevValue = state.prevValue;

        if (value !== prevValue) {
            if (value.length > 0) {
                this.setState({
                    isEditing: false,
                    prevValue: value
                }, () => {
                    this.props.listElementUpdate(value, this.props.id, this.props.listId);
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
        } else {
            this.input.current.blur();
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
        } else {
            this.setState({
                isEditing: false
            });
        }
        this.setTextAreaHeight();
    }

    handleElementSubmit = (e) => {
        if(e.which === 13) {
            e.preventDefault();
            this.handleInputSubmit();
        }
    }

    handleInputChange = () => {
        this.setState({
            value: this.input.current.value
        })
        this.setTextAreaHeight();
    }

    handeDeleteElement = (e) => {
        e.preventDefault();
        this.props.listElementDelete(this.props.id, this.props.checked, this.props.listId);
    }

    handleProductCheck = (e) => {
        if(e.target.checked) {
            this.props.listElementCheck(this.props.id, this.props.listId);
        } else {
            this.props.listElementUncheck(this.props.id, this.props.listId);
        }
    }

    componentDidMount() {
        this.setTextAreaHeight();
    }

    setTextAreaHeight = () => {
        const input = this.input.current;

        this.setState({
            height: 0 // FIRST RESET HEIGHT TO REDUCE SIZE ON REMOVING TEXT
        }, () => {
            this.setState({
                height: input.scrollHeight
            });
        });
    }

    render() {
        const id = this.props.id,
            checked = this.props.checked;


        let inputClasses = ['productBlock__input'],
            labelClasses = ['productBlock__customCheckbox'],
            containerClasses = ['productBlock__container'];

        if(checked) {
            inputClasses = [...inputClasses, 'productBlock__input--checked'];
            labelClasses = [...labelClasses, 'productBlock__customCheckbox--checked'];
            containerClasses = [...containerClasses, 'productBlock__container--checked'];
        }

        if (this.state.isEditing) {
            containerClasses = [...containerClasses, 'productBlock__container--focused'];
        }


        return (
            <div className="productsList__elem productBlock">
                <form onSubmit={this.handleInputSubmit} className={containerClasses.join(' ')} ref={this.form}>
                    <label htmlFor={'checkbox' + id} className={labelClasses.join(' ')}>
                        <input
                            className="productBlock__checkbox"
                            id={'checkbox' + id}
                            checked={checked}
                            onChange={this.handleProductCheck}
                            type="checkbox" />
                        <FontAwesomeIcon icon={faCheck} className="productBlock__checkIcon" />
                    </label>
                    <div className="productBlock__inputContainer">
                        <textarea 
                            ref={this.input}
                            rows="1"
                            className={inputClasses.join(' ')}
                            type='text'
                            value={this.state.value}
                            onKeyDown={this.handleElementSubmit}
                            onBlur={this.hanldeInputBlur}
                            onFocus={this.handleElementEdit}
                            onChange={this.handleInputChange}
                            style={{height: this.state.height}}
                            >
                        ></textarea>
                        <input className="productBlock__submit" type="submit"/>
                    </div>
                    <button className="productBlock__remove" onClick={this.handeDeleteElement}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        listElementUpdate: (name, id, listId) => dispatch(action.updateProduct(name, id, listId)),
        listElementDelete: (id, checked, listId) => dispatch(action.deleteProduct(id, checked, listId)),
        listElementCheck: (id, listId) => dispatch(action.checkProduct(id, listId)),
        listElementUncheck: (id, listId) => dispatch(action.uncheckProduct(id, listId)),
    }
}

ProductListElement.propTypes = {
    checked: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    listId: PropTypes.string.isRequired
}

export default connect(null, mapDispatchToProps)(ProductListElement);