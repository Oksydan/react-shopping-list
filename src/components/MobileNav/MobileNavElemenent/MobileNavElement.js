import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const mobileNavElement = ({path, title, children}) => (
    <NavLink 
        to={path}
        title={title}
        exact 
        className="mobileNav__link"
        activeClassName="mobileNav__link--active"
        >
        {children}
    </NavLink>
);

mobileNavElement.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
}


export default mobileNavElement;

