import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

const signOut = props => {
    props.logOut();
    return <Redirect to="/" />;
}

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(actions.signOut())
    }
}


export default connect(null, mapDispatchToProps)(signOut); 