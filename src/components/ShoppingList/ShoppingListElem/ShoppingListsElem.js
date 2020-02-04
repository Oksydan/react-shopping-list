import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/pro-regular-svg-icons';
import { getDateByTimestamp } from '../../../utils/utils';

const shoppingListsElem = (props) => {
    const link = 'list/' + props.id;
    return (
        <li className="shoppingList__elem">
            <Link className="shoppingList__link" to={link}>
                <p className="shoppingList__title">{props.title}</p>
                <p className="shoppingList__date">Created at: {getDateByTimestamp(props.date)}</p>
            </Link>
            <button className="shoppingList__btn shoppingList__btn--edit" onClick={props.handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="shoppingList__btn shoppingList__btn--delete" onClick={props.handleDelete}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
        </li>
    )
}

shoppingListsElem.propTypes = {
    title: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    date: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
}

export default shoppingListsElem;