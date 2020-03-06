import React, { Fragment } from 'react';
import FriendsList from '../../containers/FriendsList/FriendsList';

const friends = () => (
    <Fragment>
        <h1 className="pageHeading">
            <span className="pageHeading__inner">
                Firends list
            </span>
        </h1>
        <FriendsList />
    </Fragment>
);

export default friends;