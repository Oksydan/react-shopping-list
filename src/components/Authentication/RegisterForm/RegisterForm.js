import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import Form from '../../Form/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLockAlt, faUser } from '@fortawesome/pro-light-svg-icons';


 
const registerFrom = props => {

    const fields = {
        name: {
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
        email: {
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
        password: {
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
    };


    return (
        <div className="formBlock">
            <h1 className="pageHeading">
                <span className="pageHeading__inner">
                    Create new account
                </span>
            </h1>
            <Form 
                onFormSubmit={props.auth}
                submitText="Register"
                fields={fields}
                error={props.error}
                >
            </Form>
            <div className="formBlock__footer">
                <Link to="/auth">Already have an account? Log in!</Link>
            </div>
        </div>
        
    )
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (data) => dispatch(actions.auth(data, 'register'))
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(registerFrom);