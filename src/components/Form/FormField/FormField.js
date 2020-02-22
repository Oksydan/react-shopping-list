import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Alert from '../../UI/Alert/Alert';


const formFiled = props => {

    let field,
        formGroup = [],
        validationError = null,
        label = props.label ? <label className='formField__label' htmlFor={props.name}>{props.label}</label> : null,
        fieldClasses = ['formField'];


    if (props.type === 'text' || props.type === 'email' || props.type === 'password') {

        fieldClasses = [...fieldClasses, 'formField--field'];

        let inputClass = ['formField__input'];

        if (props.hasError) {
            inputClass = [...inputClass, 'formField__input--hasError'];
        }

        if (props.validationError && props.displayValidationError) {
            validationError = <Alert 
                text={props.validationError}
                showIcon={false} 
                type="danger"
                className="alert--smaller"
                />;
        }

        field = <input
            className={inputClass.join(' ')}
            type={props.type}
            value={props.value}
            id={props.name}
            name={props.name}
            onChange={props.fieldChange} 
            />;
        
        formGroup = [field, label, validationError];

    } else if (props.type === 'select') {

        fieldClasses = [...fieldClasses, 'formField--select'];

        field = <select className='formField__select' value={props.value} onChange={props.fieldChange} name={props.name} id={props.name}>
                    {props.options.map(option => <option value={option.value} checked={option.checked}>{option.name}</option>)}
                </select>;
        formGroup = [label, field];
    } else if (props.type === 'checkbox' || props.type === 'radio') {

        fieldClasses = [...fieldClasses, `formField--${props.type}`];

        field = <input
            className={`formField__${props.type}`}
            type={props.type} value={props.value}
            id={props.name} name={props.name}
            checked={props.checked}
            onChange={props.fieldChange} 
            />;
        formGroup = [field, label];
    }


    return (
        <div className={fieldClasses.join(' ')}>
            {formGroup.map((elem, i) => <Fragment key={i}>{elem}</Fragment>)}
            {(props.type !== 'checkbox' || props.type !== 'radio') && props.icon ? 
                <label className='formField__icon' htmlFor={props.name}>{props.icon}</label>
                :
                null
            }
        </div>
    );
}


formFiled.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    fieldChange: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    hasError: PropTypes.bool,
    displayValidationError: PropTypes.bool.isRequired,
    validationError: PropTypes.string,
    options: PropTypes.array,
    icon: PropTypes.node
}

export default formFiled;