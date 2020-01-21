import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

const signOut = props => {
    props.logOut();
    return props.userID != null ? 'Logging out' :<Redirect to="/" />;
}

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(actions.signOut())
    }
}
const mapStateToProps = state => {
    return {
        userID: state.auth.uId
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(signOut); 