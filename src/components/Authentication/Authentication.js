import React from 'react';
import RegisterForm from '../../containers/RegisterForm/RegisterForm';
import LoginForm from '../../containers/LoginForm/LoginForm';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const authentication = props => {
    const isRegisterForm = new URLSearchParams(props.location.search).get('newaccount');

    const content = props.userID ? <Redirect to="/" /> : isRegisterForm ? <RegisterForm /> : <LoginForm />;

    return content;
}

const mapStateToProps = state => {
    return {
        userID: state.auth.uId
    }
}


export default connect(mapStateToProps)(authentication);