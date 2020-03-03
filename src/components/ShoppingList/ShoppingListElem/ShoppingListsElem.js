import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/pro-light-svg-icons';
import { faEdit, faTrashAlt, faCheckSquare } from '@fortawesome/pro-regular-svg-icons';
import { getDateByTimestamp } from '../../../utils/utils';
import ConfirmationModal from '../../UI/ConfirmationModal/ConfirmationModal';

class ShoppingListsElem extends Component { 

    state = {
        showConfirmationModal: false
    }

    handleCloseModal = () => {
        this.setState({ showConfirmationModal: false });
    }

    handleOpenModal = () => {
        this.setState({ showConfirmationModal: true });
    }

    render () {
        const link = 'list/' + this.props.id,
            progressWidth = this.props.listElemes > 0 ? this.props.checkedElemes / this.props.listElemes * 100 : 0;

        let counterClasses;

        if (progressWidth === 100) {
            counterClasses = 'shoppingList__info shoppingList__info--textRight shoppingList__info--success';
        } else {
            counterClasses = 'shoppingList__info shoppingList__info--textRight';
        }


        return (
            <li className="shoppingList__elem">
                <Link className="shoppingList__link" to={link}>
                    <p className="shoppingList__info"><FontAwesomeIcon className="shoppingList__infoIcon" icon={faCalendarAlt} /> {getDateByTimestamp(this.props.date)}</p>
                    <p className="shoppingList__title">{this.props.title}</p>
                    <div className={counterClasses}>
                        <FontAwesomeIcon className="shoppingList__infoIcon" icon={faCheckSquare} /> {this.props.checkedElemes}/{this.props.listElemes}
                    </div>
                    <div className="shoppingList__progressBar">
                        <div style={{ width: progressWidth + '%' }} className="shoppingList__progressBarInner"></div>
                    </div>
                </Link>
                <div className="shoppingList__btns">
                    <button className="shoppingList__btn shoppingList__btn--edit" onClick={this.props.handleEdit}>
                        <FontAwesomeIcon className="shoppingList__btnIcon" icon={faEdit} /> edit
                </button>
                    <button className="shoppingList__btn shoppingList__btn--delete" onClick={this.handleOpenModal}>
                        <FontAwesomeIcon className="shoppingList__btnIcon" icon={faTrashAlt} /> remove
                </button>
                </div>
                <ConfirmationModal
                    show={this.state.showConfirmationModal}
                    handleClose={this.handleCloseModal}
                    handleConfirmation={this.props.handleDelete}
                    confirmationButtonText='Delete'
                >
                    <p>
                        Are your sure your want to delete this shopping list
                    </p>
                </ConfirmationModal>
            </li>
        )
    }
    
}

ShoppingListsElem.propTypes = {
    title: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    date: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    listElemes: PropTypes.number.isRequired,
    checkedElemes: PropTypes.number.isRequired
}

export default ShoppingListsElem;