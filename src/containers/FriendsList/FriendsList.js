import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Form from '../../components/Form/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/pro-light-svg-icons';


const FriendsList = props =>  {


    const handleSubmit = (data) => {
        props.addFriend(data.email.value);
    }

    const friendsRequests = props.friendsRequests,
        requestsList = friendsRequests.length > 0 ?
            friendsRequests.map(el => (
                <div key={el.id}>
                    {el.requestedUserName} send you friend request
                    <div>
                        <button onClick={() => props.approveFriend(el.id, el.requestedUserId, el.requestedUserName)}>Approve</button>
                        <button onClick={() => props.declineFriend(el.id)}>Declie</button>
                    </div>
                </div>
            )) : null;

    const fields = {
        email: {
            name: 'email',
            type: 'email',
            label: 'Email address',
            value: '',
            validation: {
                isEmail: true,
                isRequired: true
            },
            validationInfo: 'Value is not valid email adress',
            validationInfoDisplayed: false,
            hasError: false,
            icon: <FontAwesomeIcon icon={faEnvelope} />
        }
    }


    return (
        <Fragment>
            <Form
                onFormSubmit={handleSubmit}
                submitText="Add"
                fields={fields}
                beforeFields={<p>Type friend's email adress to add him to your friends list</p>}
                oneLineForm={true}
                clearFieldsAfterSubmit={true}
            >
            </Form>
            {requestsList}
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addFriend: email => dispatch(actions.addFriendRequest(email)),
        approveFriend: (id, reqUserId, reqUserName) => dispatch(actions.friendRequestApprove(id, reqUserId, reqUserName)),
        declineFriend: id => dispatch(actions.friendRequestDecline(id))
    }
}

const mapStateToProps = state => {
    return {
        friendsRequests: state.friends.friendsRequests
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);