import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../../components/Form/Form';
import FormField from '../../components/Form/FormField/FormField'; 
import * as actions from '../../store/actions/index';
import { isEmail } from '../../utils/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/pro-light-svg-icons';

class PersonalDataForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    label: 'Your name',
                    value: props.uName,
                    validation: {
                        minLength: 3,
                        isRequired: true
                    },
                    hasError: false,
                    icon: <FontAwesomeIcon icon={faUser} />
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
            this.props.updateData(fields[0].value);
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

    render () {
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
                <p>Edit your user name</p>
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
        updateData: (name) => dispatch(actions.updateUserData(name))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PersonalDataForm);