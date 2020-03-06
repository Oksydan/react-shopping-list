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
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addFriend: email => dispatch(actions.addFriend(email))
    }
}

export default connect(null, mapDispatchToProps)(FriendsList);