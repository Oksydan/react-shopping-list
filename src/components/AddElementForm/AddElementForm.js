import React from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button/Button';



const addElementForm = (props) => (
    <form onSubmit={props.handleSubmit}>
        <input type="text" onChange={props.handleInputChange} value={props.inputVal} />
        <Button 
            clicked={props.handleSubmit}
            type="submit"
            displayType="primary"
            disabled={!props.isInputValid}
            >Add</Button>
    </form>
);

addElementForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    isInputValid: PropTypes.bool.isRequired,
    inputVal: PropTypes.string.isRequired
}


export default addElementForm;