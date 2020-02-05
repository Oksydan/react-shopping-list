import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';


const backdrop = (props) => (
    <CSSTransition
        in={props.show}
        timeout={0}
        unmountOnExit
        classNames={{
            enter: 'backdrop--show',
            enterActive: 'backdrop--shown',
            exit: 'backdrop--hide',
            exitActive: 'backdrop--hidden'
        }}
        >
        <div className="backdrop" onClick={props.clicked}>
        </div>
    </CSSTransition>
);



backdrop.propTypes = {
    show: PropTypes.bool.isRequired,
    clicked: PropTypes.func.isRequired
}

export default backdrop;

