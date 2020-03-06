import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MobileNavElemenent from './MobileNavElemenent/MobileNavElement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStoreAlt, faUserFriends, faArrowAltLeft } from '@fortawesome/pro-regular-svg-icons';

const mobileNav = props => {

    const arrayOfLocation = props.location.pathname.split('/'),
        isDeeperPage = arrayOfLocation.length > 2 && arrayOfLocation[1] !== 'list';

    const navLinks = [
        {
            path: isDeeperPage ? `/${arrayOfLocation[1]}` : '/',
            title: 'Back to home page',
            icon: props.location.pathname === '/' ? faStoreAlt : faArrowAltLeft
        },
        {
            path: props.userID != null ? '/myaccount' : '/auth',
            title: props.userID != null ? 'Manage my account' : 'Login to your account',
            icon: faUser
        },
        {
            path: '/friends',
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
            <nav className="mobileNav__list">
                {links}
            </nav>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userID: state.auth.uId
    }
}

export default connect(mapStateToProps)(withRouter(mobileNav));