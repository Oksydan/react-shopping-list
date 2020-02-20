import React from 'react';
import { connect } from 'react-redux';
import Form from '../../Form/Form';
import * as actions from '../../../store/actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/pro-light-svg-icons';

const editEmailForm = props =>  {

    const fields = {
        email: {
            name: 'email',
            type: 'email',
            label: 'Your email',
            value: props.uEmail,
            validation: {
                isEmail: true,
                isRequired: true
            },
            hasError: false,
            icon: <FontAwesomeIcon icon = { faEnvelope } />
        }
    }


    return (
        <Form 
            onFormSubmit={props.updateData}
            submitText="Edit"
            fields={fields}>
            <p>Change your account email. Be aware to type right email address.</p>
        </Form>
    )
}


const mapStateToProps = state => {
    return {
        uEmail: state.auth.email
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateData: ({ email }) => dispatch(actions.updateUserEmail(email))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(editEmailForm);