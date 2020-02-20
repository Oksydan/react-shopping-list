import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const myAccountLink = (props) => (
    <li className="myAccountLinks__elem">
        <Link className="myAccountLinks__link" to={props.to}>
            <div className="myAccountLinks__icon">
                <FontAwesomeIcon icon={props.icon} />
            </div>
            <h5 className="myAccountLinks__title">
                {props.title}
            </h5>
        </Link>
    </li>
);

export default myAccountLink;