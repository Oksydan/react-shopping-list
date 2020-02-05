import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';



class Modal extends Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }


    render() {
        let classes = ['modal'];

        if(this.props.classes) {
            classes = [...classes, ...this.props.classes]
        }

        const modalHeader = this.props.title ? 
            <div className="modal__header">
                <h5 className="modal__title">{this.props.title}</h5>
            </div>
            : null;

        return (
            <Fragment>
                <CSSTransition
                    in={this.props.show}
                    timeout={400}
                    unmountOnExit
                    classNames={{
                        enter: 'modal--show',
                        enterActive: 'modal--shown',
                        exit: 'modal--hide',
                        exitActive: 'modal--hidden'
                    }}
                    className={classes.join(' ')}
                >
                    <div>
                        <div className="modal__content">
                            <button className="modal__close" onClick={this.props.modalClosed}><FontAwesomeIcon icon={faTimes}/></button>
                            {modalHeader}
                            <div className="modal__body">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </CSSTransition>
                <Backdrop clicked={this.props.modalClosed} show={this.props.show}></Backdrop>
            </Fragment>
        )
    }
}

Modal.propTypes = {
    modalClosed: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    title: PropTypes.string,
    classes: PropTypes.array,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}

export default Modal;