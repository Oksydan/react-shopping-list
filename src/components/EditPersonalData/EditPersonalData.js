import React,{ Fragment } from 'react';
import PersonalDataForm from './EditPersonalDataForm/EditPersonalDataForm';

const personalData = () => {

    return (
        <Fragment>
            <h1 className="pageHeading">
                <span className="pageHeading__inner">
                    Edit personal data
                </span>
            </h1>
            <PersonalDataForm />
        </Fragment>
    )
}


export default personalData;