import React from 'react';
import Notification from '../UI/Notification/Notification';
import { connect } from 'react-redux';

const appNotification = ({ appNotifiy }) => (
    <Notification notifications={appNotifiy} />
);

const mapStateToProps = state => {
    return {
        appNotifiy: state.general.notifications
    }
}


export default connect(mapStateToProps)(appNotification);