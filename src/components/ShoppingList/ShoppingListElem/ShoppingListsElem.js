import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/pro-light-svg-icons';
import { faEdit, faTrashAlt, faCheckSquare } from '@fortawesome/pro-regular-svg-icons';
import { getDateByTimestamp } from '../../../utils/utils';

const shoppingListsElem = (props) => { 
    const link = 'list/' + props.id,
        progressWidth = props.listElemes > 0 ? props.checkedElemes/props.listElemes * 100  : 0;

    let counterClasses;
        
    if (progressWidth === 100) {
        counterClasses = 'shoppingList__info shoppingList__info--textRight shoppingList__info--success';
    } else {
        counterClasses = 'shoppingList__info shoppingList__info--textRight';

    }

    return (
        <li className="shoppingList__elem">
            <Link className="shoppingList__link" to={link}>
                <p className="shoppingList__info"><FontAwesomeIcon className="shoppingList__infoIcon" icon={faCalendarAlt}/> {getDateByTimestamp(props.date)}</p>
                <p className="shoppingList__title">{props.title}</p>
                <div className={counterClasses}>
                    <FontAwesomeIcon className="shoppingList__infoIcon" icon={faCheckSquare} /> {props.checkedElemes}/{props.listElemes}
                </div>
                <div className="shoppingList__progressBar">
                    <div style={{ width: progressWidth + '%' }} className="shoppingList__progressBarInner"></div>
                </div>
            </Link>
            <div className="shoppingList__btns">
                <button className="shoppingList__btn shoppingList__btn--edit" onClick={props.handleEdit}>
                    <FontAwesomeIcon className="shoppingList__btnIcon" icon={faEdit} /> edit
                </button>
                <button className="shoppingList__btn shoppingList__btn--delete" onClick={props.handleDelete}>
                    <FontAwesomeIcon className="shoppingList__btnIcon" icon={faTrashAlt} /> remove
                </button>
            </div>
            
        </li>
    )
}

shoppingListsElem.propTypes = {
    title: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    date: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    listElemes: PropTypes.number.isRequired,
    checkedElemes: PropTypes.number.isRequired
}

export default shoppingListsElem;