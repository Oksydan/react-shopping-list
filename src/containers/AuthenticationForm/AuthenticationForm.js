import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { isEmail } from '../../utils/validation';
import Form from '../../components/Form/Form';
import FormField from '../../components/Form/FormField/FormField'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLockAlt } from '@fortawesome/pro-light-svg-icons';



class Authentication extends Component {

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
                    fields[0].value,
                    fields[1].value,
                    this.props.isRegisterForm ? 'register' : 'login'
                );
        }

    }

    validateField = elem => {
        const   field = elem,
                rules = field.validation;

        let valid = true;

        for (const rule in rules) {
            valid = valid && this.validate(field, rule, rules[rule]);
        }
        
        return !valid;
    }

    validate = (elem, rule, ruleValue) => {

        switch(rule) {
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
        const   target = e.target,
                value = target.value,
                name = target.attributes.name.value;

        const state = {
            ...this.state,
            fields: [
                ...this.state.fields
            ]
        };

        const index = state.fields.findIndex(field => field.name === name ? true : false);

        const field = {...state.fields[index]};

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

        const isRegisterForm = this.props.isRegisterForm;

        const headingText = isRegisterForm ? 'Create new account' : 'Login to your account';

        const footerLink = isRegisterForm ? <Link to="/auth">Already have an account? Log in!</Link> : <Link to="/auth?newaccount=1">Don't have an account? Create one!</Link>;

        const submitText = isRegisterForm ? 'Register' : 'Sign in';


        return (
            <div className="formBlock">
                <h1>{headingText}</h1>
                <Form handleSubmit={this.handleSubmit} submitText={submitText}>
                    {fields}
                </Form>
                <div className="formBlock__footer">
                    {footerLink}
                </div>
            </div>
            
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, pass, type) => dispatch(actions.auth(email, pass, type))
    }
}


export default connect(null, mapDispatchToProps)(Authentication);