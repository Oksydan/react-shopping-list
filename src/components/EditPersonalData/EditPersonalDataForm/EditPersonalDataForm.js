import React from 'react';
import { connect } from 'react-redux';
import Form from '../../Form/Form';
import FormField from '../../Form/FormField/FormField'; 
import * as actions from '../../../store/actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/pro-light-svg-icons';

const personalDataForm = props => {


    const fields = {
        name: {
            name: 'name',
            type: 'text',
            label: 'Your name',
            value: props.uName,
            validation: {
                minLength: 3,
                isRequired: true
            },
            hasError: false,
            icon: <FontAwesomeIcon icon={faUser} />
        }
    }

    return (
        <Form 
            onFormSubmit={props.updateData}
            submitText="Edit"
            fields={fields}
            >
            <p>Edit your user name</p>
        </Form>
    )
}

const mapStateToProps = state => {
    return {
        uName: state.auth.displayName
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateData: ({name}) => dispatch(actions.updateUserData(name))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(personalDataForm);