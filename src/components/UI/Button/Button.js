import React from 'react';
import PropTypes from 'prop-types'

const button = (props) => {

    let classes = ['button'];

    if(props.classes) {
        classes = [...classes, ...props.classes];
    }

    switch(props.displayType) {
        case 'primary':
            classes = [...classes, 'button--primary'];
            break;
        case 'secondary':
            classes = [...classes, 'button--secondary'];
            break;
        default:
            break;
    }
    
    return (
        <button
            className={classes.join(' ')}
            type={props.type}
            onClick={props.clicked}
            disabled={props.disabled}
            >
            {props.children}
        </button>
    )
}

export default button;

button.propTypes = {
    classes: PropTypes.array,
    clicked: PropTypes.func,
    disabled: PropTypes.bool,
    displayType: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ])
}