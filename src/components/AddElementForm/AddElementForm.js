import React from 'react';
import PropTypes from 'prop-types';



const addElementForm = (props) => (
    <form onSubmit={props.handleSubmit}>
        <input type="text" onChange={props.handleInputChange} value={props.inputVal} />
        <button type="submit" disabled={!props.isInputValid}>Add</button>
    </form>
);

addElementForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    isInputValid: PropTypes.bool.isRequired,
    inputVal: PropTypes.string.isRequired
}


export default addElementForm;