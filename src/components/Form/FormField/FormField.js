import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const formFiled = props => {

    let field,
        formGroup = [],
        label = props.label ? <label htmlFor={props.name}>{props.label}</label> : null;


    if (props.type === 'text' || props.type === 'email' || props.type === 'password') {
        field = <input style={{ background: props.hasError ? 'red' : 'white' }} type={props.type} value={props.value} id={props.name} name={props.name} onChange={props.fieldChange} />;
        
        formGroup = [label, field];

    } else if (props.type === 'select') {
        field = <select value={props.value} onChange={props.fieldChange} name={props.name} id={props.name}>
                    {props.options.map(option => <option value={option.value} checked={option.checked}>{option.name}</option>)}
                </select>;
        formGroup = [label, field];
    } else if (props.type === 'checkbox' || props.type === 'radio') {
        field = <input type={props.type} value={props.value} id={props.name} name={props.name} checked={props.checked} onChange={props.fieldChange} />;
        formGroup = [field, label];
    }



    return (
        <div>
            {formGroup.map((elem, i) => <Fragment key={i}>{elem}</Fragment>)}
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
    options: PropTypes.array,

}

export default formFiled;