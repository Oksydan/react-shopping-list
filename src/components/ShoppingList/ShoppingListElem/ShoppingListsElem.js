import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/pro-light-svg-icons';
import { faEdit, faTrashAlt, faCheckSquare, faShareAlt } from '@fortawesome/pro-regular-svg-icons';
import { getDateByTimestamp } from '../../../utils/utils';
import Button from '../../UI/Button/Button';
import ConfirmationModal from '../../UI/ConfirmationModal/ConfirmationModal';
import Modal from '../../UI/Modal/Modal';
import ShoppingListShare from '../../../containers/ShoppingListShare/ShoppingListShare';

class ShoppingListsElem extends Component { 

    state = {
        showConfirmationModal: false,
        showShareModal: false
    }

    handleCloseDeleteModal = () => {
        this.setState({ showConfirmationModal: false });
    }

    handleOpenDeleteModal = () => {
        this.setState({ showConfirmationModal: true });
    }

    handleCloseShareModal = () => {
        this.setState({ showShareModal: false });
    }

    handleOpenShareModal = () => {
        this.setState({ showShareModal: true });
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

        const isCurrentUserOwner = this.props.ownerId === this.props.userId;

        const listButtons = isCurrentUserOwner ? 
            <div className="shoppingList__btns">
                <Button displayType="link" className="shoppingList__btn shoppingList__btn--edit" clicked={this.props.handleEdit}>
                    <FontAwesomeIcon className="shoppingList__btnIcon" icon={faEdit} /> edit
                </Button>
                <Button displayType="link" className="shoppingList__btn shoppingList__btn--delete" clicked={this.handleOpenDeleteModal}>
                    <FontAwesomeIcon className="shoppingList__btnIcon" icon={faTrashAlt} /> remove
                </Button>
                <ConfirmationModal
                    show={this.state.showConfirmationModal}
                    handleClose={this.handleCloseDeleteModal}
                    handleConfirmation={this.props.handleDelete}
                    confirmationButtonText='Delete'
                >
                    <p>
                        Are your sure your want to delete this shopping list
                    </p>
                </ConfirmationModal>
                <Button displayType="link" className="shoppingList__btn shoppingList__btn--share" clicked={this.handleOpenShareModal}>
                    <FontAwesomeIcon className="shoppingList__btnIcon" icon={faShareAlt} />
                </Button>
                <Modal
                    show={this.state.showShareModal}
                    modalClosed={this.handleCloseShareModal}
                    title="Share your shopping list"
                >
                    <ShoppingListShare permitedUsers={this.props.permitedUsers} />
                </Modal>
            </div>
            : null;



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
                {listButtons}
                
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