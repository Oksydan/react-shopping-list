import React, { Fragment } from 'react';
import MyAccountLink from './MyAccountLink/MyAccountLink';
import { faSignOut, faUserCog } from '@fortawesome/pro-regular-svg-icons';

const myAccount = () => {
    const links = [
        {
            title: 'My personal data',
            to: '/personal-data',
            icon: faUserCog
        },
        {
            title: 'Logout',
            to: '/logout',
            icon: faSignOut
        }
    ];

    const userElems = links.map(elem => <MyAccountLink 
        title={elem.title}
        to={elem.to}
        icon={elem.icon}
    />);

    return (
        <Fragment>
            <h1 class="pageHeading">
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