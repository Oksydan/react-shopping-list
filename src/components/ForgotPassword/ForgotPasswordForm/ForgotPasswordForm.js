import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Form from '../../Form/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/pro-light-svg-icons';



class ForgtoPasswordForm extends Component {

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
            }
        };


        return (
            <div className="formBlock">
                <Form
                    onFormSubmit={this.props.resetPasssword}
                    submitText="Reset your password"
                    fields={fields}
                    error={this.props.error}
                    beforeFields={<p>Send an email with link to password reset</p>}
                >
                </Form>
            </div>

        )
    }


}

const mapDispatchToProps = dispatch => {
    return {
        resetPasssword: (data) => dispatch(actions.resetPasswordEmail(data)),
        clearError: () => dispatch(actions.eraseError())
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ForgtoPasswordForm);