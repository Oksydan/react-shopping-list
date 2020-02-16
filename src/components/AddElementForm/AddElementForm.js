import React from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button/Button';



const addElementForm = (props) => (
    <form onSubmit={props.handleSubmit} className="elementsForm">
        <div className="elementsForm__elem">
            <input className="elementsForm__input" type="text" onChange={props.handleInputChange} value={props.inputVal} />
        </div>
        <Button 
            clicked={props.handleSubmit}
            type="submit"
            displayType="primary"
            disabled={!props.isInputValid}
            classes={['elementsForm__btn']}
            >
                {props.btnText ? props.btnText : 'Add'}
            </Button>
    </form>
);

addElementForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    isInputValid: PropTypes.bool.isRequired,
    inputVal: PropTypes.string.isRequired,
    btnText: PropTypes.string,
}


export default addElementForm;