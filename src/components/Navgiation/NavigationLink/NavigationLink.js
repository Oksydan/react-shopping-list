import React from 'react';
import { Link  } from 'react-router-dom';
import PropTypes from 'prop-types';

const navigationLink = (props) => (
    <li>
        <Link to={props.path}>{props.title}</Link>
    </li>
);

navigationLink.propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}


export default navigationLink;