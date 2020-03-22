import React from 'react';
import PropTypes from 'prop-types'

const button = ({ className, displayType, type, clicked, disabled, children }) => {

    const additionalClasses = className ? className.split(' ') : null;

    let classes = ['button'];

    if (additionalClasses) {
        classes = [...classes, ...additionalClasses]
    }

    switch(displayType) {
        case 'primary':
            classes = [...classes, 'button--primary'];
            break;
        case 'secondary':
            classes = [...classes, 'button--secondary'];
            break;
        case 'danger':
            classes = [...classes, 'button--danger'];
            break;
        case 'link':
            classes = [...classes, 'button--link'];
            break;
        default:
            break;
    }
    
    return (
        <button
            className={classes.join(' ')}
            type={type ? type : null}
            onClick={clicked}
            disabled={disabled}
            >
            {children}
        </button>
    )
}

export default button;

button.propTypes = {
    className: PropTypes.string,
    clicked: PropTypes.func,
    disabled: PropTypes.bool,
    displayType: PropTypes.string.isRequired,
    type: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ])
}