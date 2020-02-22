import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../../Form/Form';
import * as actions from '../../../store/actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/pro-light-svg-icons';

class EditEmailForm extends Component {

    componentWillUnmount() {
        this.props.clearError();
    }

    render() {
        const fields = {
            email: {
                name: 'email',
                type: 'email',
                label: 'Your email',
                value: this.props.uEmail,
                validation: {
                    isEmail: true,
                    isRequired: true
                },
                validationInfo: 'Value is not valid email adress',
                validationInfoDisplayed: false,
                hasError: false,
                icon: <FontAwesomeIcon icon={faEnvelope} />
            }
        }


        return (
            <Form
                onFormSubmit={this.props.updateData}
                submitText="Edit"
                fields={fields}
                error={this.props.error}
            >
                <p>Change your account email. Be aware to type right email address.</p>
            </Form>
        )
    }

 
}


const mapStateToProps = state => {
    return {
        uEmail: state.auth.email,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateData: ({ email }) => dispatch(actions.updateUserEmail(email)),
        clearError: () => dispatch(actions.eraseError())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditEmailForm);