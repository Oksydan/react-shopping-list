import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../../Form/Form';
import * as actions from '../../../store/actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockAlt } from '@fortawesome/pro-light-svg-icons';


class EditPasswordForm extends Component {

    componentWillUnmount() {
        this.props.clearError();
    }

    render() {
        const fields = {
            newPassword: {
                name: 'newPassword',
                type: 'password',
                label: 'New passowrd',
                value: '',
                validation: {
                    minLength: 6,
                    isRequired: true,
                    isEqualTo: 'confirmPassword'
                },
                validationInfo: 'Password must contains at least 6 characters and passwords must be euqal',
                validationInfoDisplayed: false,
                hasError: false,
                icon: <FontAwesomeIcon icon={faLockAlt} />
            },
            confirmPassword: {
                name: 'confirmPassword',
                type: 'password',
                label: 'Confirm passowrd',
                value: '',
                validation: {
                    minLength: 6,
                    isRequired: true,
                    isEqualTo: 'newPassword'
                },
                validationInfo: 'Password must contains at least 6 characters and passwords must be euqal',
                validationInfoDisplayed: false,
                hasError: false,
                icon: <FontAwesomeIcon icon={faLockAlt} />
            },
        }


        return (
            <Form
                onFormSubmit={this.props.updateData}
                submitText="Edit"
                fields={fields}
                error={this.props.error}
            >
                <p>Edit your account your password. Fields data must be equal.</p>
            </Form>
        )
    }

    
}


const mapDispatchToProps = dispatch => {
    return {
        updateData: ({ newPassword }) => dispatch(actions.updateUserPassword(newPassword)),
        clearError: () => dispatch(actions.eraseError())
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditPasswordForm);