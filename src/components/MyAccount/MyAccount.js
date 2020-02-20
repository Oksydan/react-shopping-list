import React, { Fragment } from 'react';
import MyAccountLink from './MyAccountLink/MyAccountLink';
import { faSignOut, faUserCog, faUserLock, faUserEdit } from '@fortawesome/pro-regular-svg-icons';

const myAccount = () => {
    const links = [
        {
            title: 'Edit my personal data',
            to: '/myaccount/personal-data',
            icon: faUserEdit
        },
        {
            title: 'Edit my password',
            to: '/myaccount/edit-password',
            icon: faUserLock
        },
        {
            title: 'Edit my email address',
            to: '/myaccount/edit-email',
            icon: faUserCog
        },
        {
            title: 'Logout',
            to: '/logout',
            icon: faSignOut
        }
    ];

    const userElems = links.map((elem, i) => <MyAccountLink 
        key={i}
        title={elem.title}
        to={elem.to}
        icon={elem.icon}
    />);

    return (
        <Fragment>
            <h1 className="pageHeading">
                <span className="pageHeading__inner">
                    My account   
                </span>
            </h1>
            <ul className="myAccountLinks">
                {userElems}
            </ul>
        </Fragment>
    )
}


export default myAccount;