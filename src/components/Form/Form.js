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

    handleSubmit = e => {
        e.preventDefault();

        for(const field in this.state.fields) {
            this.handleFieldValidation(field);
        }

        const fields = this.state.fields;
        let areInputsValid = true,
            invalidFields = [];

        for (const name in fields) {
            areInputsValid = areInputsValid && !fields[name].hasError;
            if (fields[name].hasError) {
                invalidFields = [...invalidFields, name];
            }
        }

        if (areInputsValid) {
            this.props.onFormSubmit(this.state.fields);
            if (typeof this.props.clearFieldsAfterSubmit !== 'undefined' && this.props.clearFieldsAfterSubmit) {
                this.setState(state => {
                    for (const i in state.fields) {
                        state.fields[i].value = '';
                    }
                    return state;
                })
            }
        } else {
            this.setState(state => {
                for (const i in invalidFields) {
                    state.fields[invalidFields[i]].validationInfoDisplayed = true;
                }
                return state;
            })
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
            case 'isEqualTo':
                return this.areFieldsEqual(elem);
            default:
                return true;
        }

    }

    areFieldsEqual = elem => {
        const relatedFieldName = elem.validation.isEqualTo,
            relatedField = this.state.fields[relatedFieldName],
            relatedFieldValue = relatedField.value,
            result = elem.value === relatedFieldValue;
   

        if (result && relatedField.hasError) {
            this.setState(state => {
                state.fields[relatedFieldName].hasError = false;
                return state;
            });
        } else {
            this.setState(state => {
                state.fields[relatedFieldName].hasError = true;
                return state;
            });
        }

        return result;
    }

    handleFieldValidation = name => {
        this.setState(state => {
            state.fields[name].hasError = this.validateField({...state.fields[name]});
            return state;
        });
    }

    handleFieldChange = (e) => {
        const target = e.target,
            name = target.attributes.name.value,
            value = target.value;
            
        this.setState(state => {
            state.fields[name].value = value;
            state.fields[name].validationInfoDisplayed = false;
            return state;
        }, () => this.handleFieldValidation(name));

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
                validationError={field.validationInfo}
                displayValidationError={field.validationInfoDisplayed}
            />;
        });

        const beforeFields = this.props.beforeFields ? 
            <div className="form__info form__info--before">
                {this.props.beforeFields}
            </div>
            :
            null;
        const afterFields = this.props.afterFields ? 
            <div className="form__info form__info--after">
                {this.props.afterFields}
            </div>
            :
            null;

        const alert = this.props.error ? <Alert type="danger" text={this.props.error} /> : null;

        let formContent;

        if (this.props.oneLineForm) {
            formContent = (
                <form onSubmit={this.handleSubmit} className="form">
                    {alert}
                    {beforeFields}
                    {afterFields}
                    <div className="form__group">
                        {fields}
                        <Button
                            type='submit'
                            clicked={this.handleSubmit}
                            displayType='primary'
                        >
                            {this.props.submitText ? this.props.submitText : 'Submit'}
                        </Button>
                    </div>
                </form>
            );
        } else {
            formContent = (
                <form onSubmit={this.handleSubmit} className="form">
                    {alert}
                    {beforeFields}
                    {fields}
                    {afterFields}
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

        return formContent;
        
    }
};

Form.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    beforeFields: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    afterFiedls: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    fields: PropTypes.object.isRequired,
    submitText: PropTypes.string,
    oneLineForm: PropTypes.bool,
    clearFieldsAfterSubmit: PropTypes.bool
}


export default Form;