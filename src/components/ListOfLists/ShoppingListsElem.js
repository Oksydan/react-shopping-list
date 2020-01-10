import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const shoppingListsElem = (props) => {
    const link = 'list/' + props.id;
    return (
    <div>
        <Link to={link}>{props.title}</Link>
        <button onClick={props.handleDelete}>
            Remove
        </button>
    </div>
)}

shoppingListsElem.propTypes = {
    title: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
}

export default shoppingListsElem;