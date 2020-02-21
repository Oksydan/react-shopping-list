import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import Form from '../../Form/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLockAlt, faUser } from '@fortawesome/pro-light-svg-icons';


 
class RegisterFrom extends Component {

    componentWillUnmount() {
        this.props.clearError();
    }

    render() {
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
                    onFormSubmit={this.props.auth}
                    submitText="Register"
                    fields={fields}
                    error={this.props.error}
                >
                </Form>
                <div className="formBlock__footer">
                    <Link to="/auth">Already have an account? Log in!</Link>
                </div>
            </div>

        )
    }

    
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (data) => dispatch(actions.auth(data, 'register')),
        clearError: () => dispatch(actions.eraseError())
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterFrom);