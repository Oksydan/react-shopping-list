import React, { Fragment } from 'react';
import Logo from '../Logo/Logo';
import Navigation from '../Navgiation/Navigation';

const header = (props) => (
    <Fragment>
        <Logo />
        <Navigation />
    </Fragment>
)

export default header;