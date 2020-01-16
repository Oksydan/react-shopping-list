import React from 'react';
import NavigationLink from './NavigationLink/NavigationLink';
import { connect } from 'react-redux';


const navigation = props => {

    let links = [
        {
            path: '/',
            title: 'Home'
        }
        
    ];

    const loggedInLinks = [{
        path: '/logout',
        title: 'Logout'
    }];

    const notLoggedInLinks = [
        {
            path: '/auth',
            title: 'Login'
        },
        {
            path: '/auth?newaccount=1',
            title: 'Register'
        }
    ];


    links = props.userId ? [...links, ...loggedInLinks] : [...links, ...notLoggedInLinks];

    const linkList = links.map((link, i) => <NavigationLink key={i} title={link.title} path={link.path} />);
    
    return (
        <nav>
            {linkList}
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.auth.uId
    }
}


export default connect(mapStateToProps)(navigation);