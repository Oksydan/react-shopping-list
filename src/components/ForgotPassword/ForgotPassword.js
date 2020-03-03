import React, { Fragment } from 'react';
import ForgotPasswordForm from './ForgotPasswordForm/ForgotPasswordForm';

const forgotPassword = () => {

    return (
        <Fragment>
            <h1 className="pageHeading">
                <span className="pageHeading__inner">
                    Forgot your password ?
                </span>
            </h1>
            <ForgotPasswordForm />
        </Fragment>
    )
}


export default forgotPassword;