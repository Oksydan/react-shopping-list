import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Form from '../../components/Form/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/pro-light-svg-icons';
import ConfirmationModal from '../../components/UI/ConfirmationModal/ConfirmationModal';
import { timeAgo } from '../../utils/utils';


class FriendsList extends Component  {

    state = {
        showConfirmationModal: false,
        confirmationModalText: '',
        confirmaFunc: () => false
    }


    handleSubmit = (data) => {
        this.props.addFriend(data.email.value);
    }

    handleShowModal = (text, func) => {
        this.setState({
            showConfirmationModal: true,
            confirmationModalText: text,
            confirmaFunc: func
        })
    }

    handleCloseModal = () => {
        this.setState({
            showConfirmationModal: false
        })
    }

    handleDeleteFriend = (id, name) => {
        this.handleCloseModal();
        this.props.removeFriend(id, name);
    }

    handleDeclineFriend = (id) => {
        this.handleCloseModal();
        this.props.declineFriend(id);
    }


    render() {


        const friends = this.props.friendsList.map(el => (
            <li key={el.id}>
                <p>
                    Friend {el.friendName}
                </p>
                <div>
                    <button onClick={() => this.handleShowModal(
                            `Are your sure your don't want to be friend with ${el.friendName}`,
                            () => this.handleDeleteFriend(el.id, el.friendName)
                            )}>Remove</button>
                </div>
            </li>
        ))

        const friendsRequests = this.props.friendsRequests,
            requestsList = friendsRequests.length > 0 ?
                friendsRequests.map(el => (
                    <div key={el.id}>
                        <div>
                            {el.requestedUserName} send you friend request<br></br>
                            <small>The request was sent {timeAgo(el.addedAt)}</small>
                            
                        </div>
                        <div>
                            <button onClick={() => this.props.approveFriend(el.id, el.requestedUserId, el.requestedUserName)}>Approve</button>
                            <button onClick={() => 
                                this.handleShowModal(
                                    `Are your sure your want to decline friend request from ${el.requestedUserName}`,
                                    () => this.handleDeclineFriend(el.id)
                                )
                                }>Declie</button>
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
                    onFormSubmit={this.handleSubmit}
                    submitText="Add"
                    fields={fields}
                    beforeFields={<p>Type friend's email adress to add him to your friends list</p>}
                    oneLineForm={true}
                    clearFieldsAfterSubmit={true}
                >
                </Form>
                {requestsList}
                <ul>
                    {friends}
                </ul>
                <ConfirmationModal 
                    show={this.state.showConfirmationModal}
                    handleClose={this.handleCloseModal}
                    handleConfirmation={this.state.confirmaFunc}
                    confirmationButtonText='Yes'
                >
                    <p>{this.state.confirmationModalText}</p>
                </ConfirmationModal>
            </Fragment>
        )
    }


 
}

const mapDispatchToProps = dispatch => {
    return {
        addFriend: email => dispatch(actions.addFriendRequest(email)),
        approveFriend: (id, reqUserId, reqUserName) => dispatch(actions.friendRequestApprove(id, reqUserId, reqUserName)),
        declineFriend: id => dispatch(actions.friendRequestDecline(id)),
        removeFriend: (id, name) => dispatch(actions.removeFriend(id, name))
    }
}

const mapStateToProps = state => {
    return {
        friendsRequests: state.friends.friendsRequests,
        friendsList: state.friends.friendsList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);