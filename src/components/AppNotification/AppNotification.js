import React from 'react';
import Notification from '../UI/Notification/Notification';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const appNotification = ({ appNotifiy, removeNotification }) => (
    <Notification notifications={appNotifiy} removeNotification={removeNotification} />
);

const mapStateToProps = state => {
    return {
        appNotifiy: state.general.notifications
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeNotification: id => dispatch(actions.removeNotification(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(appNotification);