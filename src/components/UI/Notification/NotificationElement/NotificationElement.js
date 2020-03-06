import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';

const notificationElement = ({ type, id, text, removeNotify}) => {

    const classes = `notification__content notification__content--${type}`;

    return (
        <div className={classes}>
            <button className="notification__close" onClick={() => removeNotify(id)}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
            {text}
        </div>
    )
}

export default notificationElement;