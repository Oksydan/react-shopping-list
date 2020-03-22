import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Form from '../../components/Form/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/pro-light-svg-icons';
import { faTrashAlt, faCheckCircle, faTimesCircle } from '@fortawesome/pro-regular-svg-icons';
import ConfirmationModal from '../../components/UI/ConfirmationModal/ConfirmationModal';
import { timeAgo } from '../../utils/utils';
import Tabs from '../../components/UI/Tabs/Tabs';
import Tab from '../../components/UI/Tabs/Tab/Tab';
import Button from '../../components/UI/Button/Button';
import Alert from '../../components/UI/Alert/Alert';


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


        let friends = <Alert text="You do not have friends yet" type="info" />;

        if (this.props.friendsList.length > 0) {
            friends = this.props.friendsList.map(el => (
                <li key={el.id} className="informationList__elem informationList__elem--oneLine">
                    <p className="informationList__title">
                        Friend: {el.friendName}
                    </p>
                    <Button
                        displayType="link"
                        className="informationList__actionIcon"
                        clicked={() => this.handleShowModal(
                            `Are your sure your don't want to be friend with ${el.friendName}`,
                            () => this.handleDeleteFriend(el.id, el.friendName)
                        )}>
                        <FontAwesomeIcon icon={faTrashAlt} /></Button>
                </li>
            ));
        }
        

        let requestsList = <Alert text="You do not have any friends requests" type="info" />;

        const friendsRequests = this.props.friendsRequests;

        if (friendsRequests.length > 0) {
            requestsList = friendsRequests.map(el => (
                <li key={el.id} className="informationList__elem">
                    <p className="informationList__title">
                        {el.requestedUserName} send you friend request
                </p>
                    <p className="informationList__desc">
                        The request was sent {timeAgo(el.addedAt)}
                    </p>
                    <div className="informationList__footer">
                        <Button
                            displayType="link"
                            className="informationList__btn"
                            clicked={() =>
                                this.handleShowModal(
                                    `Are your sure your want to decline friend request from ${el.requestedUserName}`,
                                    () => this.handleDeclineFriend(el.id)
                                )
                            }><FontAwesomeIcon className="informationList__btnIcon" icon={faTimesCircle} /> declie</Button>
                        <Button
                            displayType="link"
                            className="informationList__btn"
                            clicked={() => this.props.approveFriend(el.id, el.requestedUserId, el.requestedUserName)}>
                            <FontAwesomeIcon className="informationList__btnIcon" icon={faCheckCircle} /> approve</Button>
                    </div>
                </li>
            ));
        }

        

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
                <Tabs selectedIndex={0}>
                    <Tab title="Friends">
                        <ul className="informationList">
                            {this.props.friendsLoaded ? friends : null}
                        </ul>
                    </Tab>
                    <Tab title="Friends requests">
                        <ul className="informationList">
                            {this.props.friendsRequestsLoaded ? requestsList : null}
                        </ul>
                    </Tab>
                </Tabs>
              
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
        friendsList: state.friends.friendsList,
        friendsLoaded: state.friends.subscribeToFriends,
        friendsRequestsLoaded: state.friends.subscribeToFriendsRequests
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);