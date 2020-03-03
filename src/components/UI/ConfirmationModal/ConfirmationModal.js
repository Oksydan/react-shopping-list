import React from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

const confiramtionModal = props => {

    return (
        <Modal
            show={props.show}
            modalClosed={props.handleClose}
            title={props.title ? props.title : null}
            classes={props.classes}
        >

            {props.children}
            <div className="modal__buttons">
                <Button 
                    displayType="danger"
                    clicked={props.handleClose}
                    classes={['button--smaller']}
                    >
                        Cancel
                </Button>
                <Button 
                    displayType="primary"
                    clicked={props.handleConfirmation}
                    classes={['button--smaller']}
                    >
                    {props.confirmationButtonText}
                </Button>
            </div>
        </Modal>
    )
}

confiramtionModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleConfirmation: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    title: PropTypes.string,
    classes: PropTypes.array,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}

export default confiramtionModal;

