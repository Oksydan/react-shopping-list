import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { isEmail } from '../../utils/validation';
import Form from '../../components/Form/Form';
import FormField from '../../components/Form/FormField/FormField'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLockAlt, faUser } from '@fortawesome/pro-light-svg-icons';


 
class RegisterFrom extends Component {


    state = {
        fields: [
            {
                name: 'name',
                type: 'text',
                label: 'Your name',
                value: '',
                validation: {
                    minLength: 3,
                    isRequired: true
                },
                hasError: false,
                icon: <FontAwesomeIcon icon={faUser} />
            },
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
                        name: fields[0].value,
                        email: fields[1].value,
                        password: fields[2].value
                    },
                    'register'
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


        return (
            <div className="formBlock">
                <h1>Create new account</h1>
                <Form handleSubmit={this.handleSubmit} submitText="Register">
                    {fields}
                </Form>
                <div className="formBlock__footer">
                    <Link to="/auth">Already have an account? Log in!</Link>
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


export default connect(null, mapDispatchToProps)(RegisterFrom);