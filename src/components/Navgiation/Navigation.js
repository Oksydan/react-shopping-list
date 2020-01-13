import React from 'react';
import NavigationLink from './NavigationLink/NavigationLink';


const navigation = (props) => {

    const links = [
        {
            path: '/',
            title: 'Home'
        },
        {
            path: '/auth',
            title: 'Authentication'
        }
    ];

    const linkList = links.map((link, i) => <NavigationLink key={i} title={link.title} path={link.path} />);
    
    return (
        <nav>
            {linkList}
        </nav>
    )
}


export default navigation;