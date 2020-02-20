import React, { Fragment } from 'react';
import EditPasswordForm from './EditPasswordForm/EditPasswordForm';

const editPassword = () => {

    return (
        <Fragment>
            <h1 className="pageHeading">
                <span className="pageHeading__inner">
                    Edit your password
                </span>
            </h1>
            <EditPasswordForm />
        </Fragment>
    )
}


export default editPassword;