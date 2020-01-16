import React from 'react';
import AuthenticationForm from '../../containers/AuthenticationForm/AuthenticationForm';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const authentication = props => {
    const content = props.userID ? <Redirect to="/" /> : <AuthenticationForm />;
    
    return content;
}

const mapStateToProps = state => {
    return {
        userID: state.auth.uId
    }
}


export default connect(mapStateToProps)(authentication);