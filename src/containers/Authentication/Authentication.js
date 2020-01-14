import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { isEmail } from '../../utils/validation';
import Form from '../../components/Form/Form';
import FormField from '../../components/Form/FormField/FormField'; 

class Authentication extends Component {

    state = {
        fields: [
            {
                name: 'email',
                type: 'email',
                label: 'Your email',
                value: '',
                validation: {
                    isEmail: true
                },
                hasError: false
            },
            {
                name: 'password',
                type: 'password',
                label: 'Your passowrd',
                value: '',
                validation: {
                    minLength: 6
                },
                hasError: false
            }
        ]
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit')
    }

    validateField = elem => {
        const rules = elem.validation;
        let field = elem,
            valid = true;

        for (const rule in rules) {
            valid = this.validate(field, rule, rules[rule]);
        }

        return !valid;
    }

    validate = (elem, rule, ruleValue) => {

        switch(rule) {
            case 'minLength':
                return elem.value.length >= ruleValue;
            case 'isEmail':
                return isEmail(elem.value);
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

        const field = state.fields[index];

        field.value = value;
        field.hasError = this.validateField(field);
        
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
             />;
        });

        return (
            <Form handleSubmit={this.handleSubmit}>
                {fields}
            </Form>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        register: (email, pass) => dispatch(actions.auth(email, pass))
    }
}

export default connect(null, mapDispatchToProps)(Authentication);