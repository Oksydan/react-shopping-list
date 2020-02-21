import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/UI/Button/Button';
import FormField from './FormField/FormField';
import Alert from '../UI/Alert/Alert';
import { isEmail } from '../../utils/validation';


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: this.props.fields
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const fields = this.state.fields;
        let areInputsValid = true;

        for (const i in fields) {
            areInputsValid = areInputsValid && !fields[i].hasError;
        }

        if (areInputsValid) {
            this.props.onFormSubmit(this.state.fields);
        }

    }

    validateField = elem => {
        const field = elem,
            rules = field.validation;

        let valid = true;

        for (const rule in rules) {
            valid = valid && this.validate(field, rule, rules[rule]);
        }

        return !valid;
    }

    validate = (elem, rule, ruleValue) => {

        switch (rule) {
            case 'minLength':
                return elem.value.length >= ruleValue;
            case 'isEmail':
                return isEmail(elem.value);
            case 'isRequired':
                return elem.value.length > 0;
            default:
                return true;
        }

    }

    handleFieldChange = (e) => {
        const target = e.target,
            value = target.value,
            name = target.attributes.name.value;

        const state = {
            ...this.state,
            fields: {
                ...this.state.fields
            }
        };


        const field = { ...state.fields[name] };

        field.value = value;
        field.hasError = this.validateField(field);

        state.fields[name] = {
            ...state.fields[name],
            ...field
        }

        this.setState({
            fields: {
                ...state.fields
            }
        })

    }



    render() {
        const fields = Object.values(this.state.fields).map(field => {
            return <FormField
                key={field.name}
                fieldChange={this.handleFieldChange}
                value={field.value}
                name={field.name}
                type={field.type}
                label={field.label}
                hasError={field.hasError}
                checked={field.chekcked}
                icon={field.icon || false}
            />;
        });

        const alert = this.props.error ? <Alert type="danger" text={this.props.error} /> : null;
        return (
            <form onSubmit={this.handleSubmit} className="form">
                {alert}
                {this.props.children}
                {fields}
                <div className="form__submit">
                    <Button
                        type='submit'
                        clicked={this.handleSubmit}
                        displayType='primary'
                        classes={['button--block']}
                    >
                        {this.props.submitText ? this.props.submitText : 'Submit'}
                    </Button>
                </div>

            </form>
        );
        
    }
};

Form.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    fields: PropTypes.object.isRequired,
    submitText: PropTypes.string
}


export default Form;