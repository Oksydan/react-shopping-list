import React, { Component, Fragment } from 'react';

import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';

class Modal extends Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }


    render() {
        const classes = ['modal'];

        if (this.props.show) {
            classes.push('modal--shown');
        }

        return (
            <Fragment>
                <div className={classes.join(' ')}>
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