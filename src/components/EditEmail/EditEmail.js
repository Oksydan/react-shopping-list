import React, { Fragment } from 'react';
import EditEmailForm from './EditEmailForm/EditEmailForm';

const editEmail = () => {

    return (
        <Fragment>
            <h1 className="pageHeading">
                <span className="pageHeading__inner">
                    Edit your email
                </span>
            </h1>
            <EditEmailForm />
        </Fragment>
    )
}


export default editEmail;