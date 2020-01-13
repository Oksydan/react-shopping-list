import React, { Component } from 'react';
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
                    isEmail: true,
                    isRequired: true
                },
                hasError: []
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
                hasError: []
            }
        ]
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit')
    }

    handleFieldChange = (e) => {
        
        console.log('change');
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

export default Authentication;