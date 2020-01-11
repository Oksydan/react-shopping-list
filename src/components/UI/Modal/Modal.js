import React, { Component, Fragment } from 'react';

import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';

class Modal extends Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }


    render() {
        return (
            <Fragment>
                <div
                    style={{
                        position: 'fixed',
                        zIndex: '500',
                        backgroundColor: 'white',
                        width: '70%',
                        border: '1px solid #ccc',
                        boxShadow: '1px 1px 1px black',
                        padding: '16px',
                        left: '15%',
                        top: '30%',
                        boxSizing: 'border-box',
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <button onClick={this.props.modalClosed}>Close</button>
                    {this.props.children}
                </div>
                <Backdrop clicked={this.props.modalClosed} show={this.props.show}></Backdrop>
            </Fragment>
        )
    }
}

Modal.propTypes = {
    modalClosed: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}

export default Modal;