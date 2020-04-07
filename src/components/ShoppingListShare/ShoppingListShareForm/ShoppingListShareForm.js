import React, { Component } from 'react';
import Form from '../../Form/Form';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/pro-light-svg-icons';


class ShoppingListShareForm extends Component {

    render() {
        const fields = {
            email: {
                name: 'email',
                type: 'email',
                label: 'Email address',
                value: '',
                validation: {
                    isEmail: true,
                    isRequired: true
                },
                validationInfo: 'Value is not valid email adress',
                validationInfoDisplayed: false,
                hasError: false,
                icon: <FontAwesomeIcon icon={faEnvelope} />
            }
        };

        return (
            <Form
                onFormSubmit={this.props.resetPasssword}
                submitText="Share"
                fields={fields}
                error={this.props.error}
                oneLineForm={true}
                beforeFields={<p>Send an invitation to share your shopping list</p>}
            >
            </Form>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        resetPasssword: (data) => dispatch(actions.resetPasswordEmail(data)),
        clearError: () => dispatch(actions.eraseError())
    }
}



export default connect(null, mapDispatchToProps)(ShoppingListShareForm);