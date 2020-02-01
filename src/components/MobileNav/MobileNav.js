import React from 'react';
import { connect } from 'react-redux';
import MobileNavElemenent from './MobileNavElemenent/MobileNavElement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStoreAlt, faUserFriends } from '@fortawesome/pro-regular-svg-icons';

const mobileNav = props => {

    const navLinks = [
        {
            path: '/',
            title: 'Back to home page',
            icon: faStoreAlt
        },
        {
            path: props.userID != null ? '/myaccount' : '/auth',
            title: props.userID != null ? 'Manage my account' : 'Login to your account',
            icon: faUser
        },
        {
            path: '/friendslist',
            title: 'Manage my friends list',
            icon: faUserFriends

        }
    ];

    const links = navLinks.map(({path, title, icon}, i) => (
        <MobileNavElemenent path={path} title={title} key={i} >
            <FontAwesomeIcon icon={icon}/>
        </MobileNavElemenent>
    ))
    
    return (
        <div className="mobileNav">
            <div className="mobileNav__list">
                {links}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userID: state.auth.uId
    }
}

export default connect(mapStateToProps)(mobileNav);