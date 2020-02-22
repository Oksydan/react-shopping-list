import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faExclamationCircle, faCheckCircle, faTimesCircle } from '@fortawesome/pro-regular-svg-icons';


const alert = ({type, text, className, showIcon, ...rest}) => {

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

    const iconDisplayed = showIcon === undefined ? true : showIcon,
        icon = iconDisplayed ? <FontAwesomeIcon className="alert__icon" icon={iconType} /> : null;


    let classes = ['alert', `alert--${type}`, ...(className && className.length > 0 ? className.split(' ') : [])];

    if (iconDisplayed) {
        classes = [...classes, 'alert--iconDisplayed']
    }
    
    return (
        <div className={classes.join(' ')} {...rest}>
            {icon}{text}
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

