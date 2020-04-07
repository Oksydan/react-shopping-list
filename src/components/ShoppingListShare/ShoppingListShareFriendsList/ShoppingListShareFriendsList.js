import React from 'react';
import { connect } from 'react-redux';

const shoppingListShareFriendsList = ({ friendsList, permitedUsers }) => {

    const permitedUsersSet = new Set(permitedUsers);

    const friednsWithoutPermision = friendsList.filter(el => !permitedUsersSet.has(el.id));

    let firendsList = null;

    if (friednsWithoutPermision.length > 0) {
        firendsList = friednsWithoutPermision.map((friend, i) => {
            console.log(friend);
            return (
                <div key={i}>
                    {friend.friendName}
                </div>
            );
        })
    }


    return (
        firendsList
    )
}

const mapStateToProps = state => {
    return {
        friendsList: state.friends.friendsList
    }
}

export default connect(mapStateToProps)(shoppingListShareFriendsList);