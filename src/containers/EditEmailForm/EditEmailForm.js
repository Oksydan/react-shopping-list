import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../../components/Form/Form';
import FormField from '../../components/Form/FormField/FormField';
import * as actions from '../../store/actions/index';
import { isEmail } from '../../utils/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/pro-light-svg-icons';

class EditEmailForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: [
                {
                    name: 'email',
                    type: 'email',
                    label: 'Your email',
                    value: props.uEmail,
                    validation: {
                        isEmail: true,
                        isRequired: true
                    },
                    hasError: false,
                    icon: <FontAwesomeIcon icon={faEnvelope} />
                }
            ]
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
            this.props.updateData(fields[0].value)
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

    areFieldsEqual = (elem) => {
        const relatedField = elem.validation.isEqualTo,
            relatedFieldValue = this.state.fields.filter(elem => elem.name === relatedField)[0].value;

        return elem.value === relatedFieldValue;
    }

    handleFieldChange = (e) => {
        const target = e.target,
            value = target.value,
            name = target.attributes.name.value;

        const state = {
            ...this.state,
            fields: [
                ...this.state.fields
            ]
        };

        const index = state.fields.findIndex(field => field.name === name ? true : false);

        const field = { ...state.fields[index] };

        field.value = value;
        field.hasError = this.validateField(field);

        state.fields[index] = {
            ...state.fields[index],
            ...field
        }

        this.setState({
            fields: [
                ...state.fields
            ]
        })

    }

    render() {
        const fields = this.state.fields.map(field => {
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
        return (
            <Form handleSubmit={this.handleSubmit} submitText="Edit">
                <p>Change your account email. Be aware to type right email address.</p>
                {fields}
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
        uName: state.auth.displayName,
        uEmail: state.auth.email
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateData: (email) => dispatch(actions.updateUserEmail(email))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditEmailForm);