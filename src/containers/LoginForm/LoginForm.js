import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { isEmail } from '../../utils/validation';
import Form from '../../components/Form/Form';
import FormField from '../../components/Form/FormField/FormField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLockAlt } from '@fortawesome/pro-light-svg-icons';



class LoginForm extends Component {


    state = {
        fields: [
            {
                name: 'email',
                type: 'email',
                label: 'Your email',
                value: '',
                validation: {
                    isEmail: true,
                    isRequired: true
                },
                hasError: false,
                icon: <FontAwesomeIcon icon={faEnvelope} />
            },
            {
                name: 'password',
                type: 'password',
                label: 'Your passowrd',
                value: '',
                validation: {
                    minLength: 6,
                    isRequired: true
                },
                hasError: false,
                icon: <FontAwesomeIcon icon={faLockAlt} />
            }
        ]
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const fields = this.state.fields;
        let areInputsValid = true;

        for (const i in fields) {
            areInputsValid = areInputsValid && !fields[i].hasError;
        }

        if (areInputsValid) {
            this.props.auth(
                {
                    email: fields[0].value,
                    password: fields[1].value
                },
                'login'
            );
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
            <div className="formBlock">
                <h1>Login to your account</h1>
                <Form handleSubmit={this.handleSubmit} submitText="Sign in">
                    {fields}
                </Form>
                <div className="formBlock__footer">
                    <Link to="/auth?newaccount=1">Don't have an account? Create one!</Link>
                </div>
            </div>

        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (data, type) => dispatch(actions.auth(data, type))
    }
}


export default connect(null, mapDispatchToProps)(LoginForm);