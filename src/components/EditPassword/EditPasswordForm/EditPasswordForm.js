import React from 'react';
import { connect } from 'react-redux';
import Form from '../../Form/Form';
import FormField from '../../Form/FormField/FormField';
import * as actions from '../../../store/actions/index';
import { isEmail } from '../../../utils/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockAlt } from '@fortawesome/pro-light-svg-icons';

const editPasswordForm = props => {

    const fields = {
        newPassword: {
            name: 'newPassword',
            type: 'password',
            label: 'New passowrd',
            value: '',
            validation: {
                minLength: 6,
                isRequired: false
            },
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
                isRequired: false,
                isEqualTo: 'newPassword'
            },
            hasError: false,
            icon: <FontAwesomeIcon icon={faLockAlt} />
        },
    }


    return (
        <Form 
            onFormSubmit={props.updateData}
            submitText="Edit"
            fields={fields}
            >
            <p>Edit your account your password. Fields data must be equal.</p>
        </Form>
    )
}

const mapStateToProps = state => {
    return {
        uName: state.auth.displayName,
        uEmail: state.auth.email
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateData: ({ newPassword }) => dispatch(actions.updateUserPassword(newPassword))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(editPasswordForm);