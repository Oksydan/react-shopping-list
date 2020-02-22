import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import Form from '../../Form/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLockAlt } from '@fortawesome/pro-light-svg-icons';



class LoginForm extends Component {

    componentWillUnmount() {
        this.props.clearError();
    }

    render() {
        const fields = {
            email: {
                name: 'email',
                type: 'email',
                label: 'Your email',
                value: '',
                validation: {
                    isEmail: true,
                    isRequired: true
                },
                validationInfo: 'Value is not valid email adress',
                validationInfoDisplayed: false,
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
                validationInfo: 'Password must contains at least 6 characters',
                validationInfoDisplayed: false,
                hasError: false,
                icon: <FontAwesomeIcon icon={faLockAlt} />
            }
        }


        return (
            <div className="formBlock">
                <h1 className="pageHeading">
                    <span className="pageHeading__inner">
                        Login to your account
                </span>
                </h1>
                <Form
                    onFormSubmit={this.props.auth}
                    submitText="Sign in"
                    fields={fields}
                    error={this.props.error}
                >
                </Form>
                <div className="formBlock__footer">
                    <Link to="/auth?newaccount=1">Don't have an account? Create one!</Link>
                </div>
            </div>

        )
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (data) => dispatch(actions.auth(data, 'login')),
        clearError: () => dispatch(actions.eraseError())
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);