import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faExclamationCircle, faCheckCircle, faTimesCircle } from '@fortawesome/pro-regular-svg-icons';


const alert = ({type, text, className, ...rest}) => {

    let iconType;

    switch (type) {
        case 'success':
            iconType = faCheckCircle;
            break;
        case 'danger':
            iconType = faTimesCircle;
            break;
        case 'warning':
            iconType = faExclamationCircle;
            break;
        case 'info':
            iconType = faInfoCircle;
            break;
        default:
            iconType = faInfoCircle;
            break;
    }

    const classes = ['alert', `alert--${type}`, ...(className && className.length > 0 ? className.split(' ') : [])];
    
    return (
        <div className={classes.join(' ')} {...rest}>
            <FontAwesomeIcon className="alert__icon" icon={iconType} />{text}
        </div>
    )
}


alert.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.string
    ]).isRequired,
    className: PropTypes.string
}


export default alert;

