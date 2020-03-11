import React, { Component, Fragment } from 'react';
import AddElementForm from '../../components/AddElementForm/AddElementForm';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


class FriendsList extends Component {

    state = {
        inputValid: true,
        inputValue: ''
    }

    handleInputChange = (e) => {
        const inputValue = e.target.value;

        this.setState({
            inputValue
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addFriend(this.state.inputValue);
    }


    render() {
        const friendsRequests = this.props.friendsRequests,
            requestsList = friendsRequests.length > 0 ? 
            friendsRequests.map(el => (
                <div key={el.id}>
                    {el.requestedUserName} send your friend request
                    <div>
                        <button onClick={() => this.props.approveFriend(el.id, el.requestedUserId, el.requestedUserName)}>Approve</button>
                        <button onClick={() => this.props.declineFriend(el.id)}>Declie</button>
                    </div>
                </div>
            )) : null;

        return (
            <Fragment>
                <p>Type friend's email adress to add him to your friends list</p>
                <AddElementForm 
                    handleSubmit={this.handleSubmit}
                    isInputValid={this.state.inputValid}
                    btnText='Add'
                    handleInputChange={this.handleInputChange}
                    inputVal={this.state.inputValue}
                />
                {requestsList}
            </Fragment>
        )
    }
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