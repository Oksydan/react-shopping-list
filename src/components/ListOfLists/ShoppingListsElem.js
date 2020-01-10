import React from 'react';

const shoppingListsElem = (props) => (
    <div>
        {props.title}
        <button onClick={props.handleDelete}>
            Remove
        </button>
    </div>
)

export default shoppingListsElem;