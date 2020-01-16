import React from 'react';
import AuthenticationForm from '../../containers/AuthenticationForm/AuthenticationForm';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const authentication = props => {
    const isRegisterForm = new URLSearchParams(props.location.search).get('newaccount');

    const content = props.userID ? <Redirect to="/" /> : <AuthenticationForm isRegisterForm={isRegisterForm ? true : false} />;

    return content;
}

const mapStateToProps = state => {
    return {
        userID: state.auth.uId
    }
}


export default connect(mapStateToProps)(authentication);